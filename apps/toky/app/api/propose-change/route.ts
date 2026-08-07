import { NextResponse } from 'next/server'
import { BRAND_NAME_ERROR_MESSAGE, validateBrandName } from '@/src/tokens/brand'
import { buildChangesetContent } from '@/src/tokens/changeset'
import { applyDiffToDocument } from '@/src/tokens/edit'
import type { TokenDiffEntry } from '@/src/tokens/edit'
import { flattenTokenDocument } from '@/src/tokens/flatten'
import { brandFilePath, getGithubRef } from '@/src/tokens/github'
import {
  addBrandToIndex,
  createBranch,
  createBrandFile,
  createFileOnBranch,
  findOpenPullRequest,
  getBaseTokensFileMeta,
  getBrandTokensFileMeta,
  listTokenBrandFiles,
  openPullRequest,
  resolveReadRef,
  updateFileAtPath,
  updateFileOnBranch,
  updatePullRequestBody,
  workingBranchFor,
} from '@/src/tokens/github-write'

interface ProposeChangeRequest {
  diff: TokenDiffEntry[]
  description: string
  targetBranch?: string
  newBrands?: string[]
  brandDiffs?: Record<string, TokenDiffEntry[]>
}

interface ConflictInfo {
  path: string
  reason: 'changed' | 'already-exists'
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unknown error'
}

// Conservative git ref name check — good enough to reject anything that'd
// confuse the GitHub API or shell tooling downstream, not a full spec parse.
const VALID_BRANCH_NAME = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/

function resolveTargetBranch(targetBranch: string | undefined): string | null {
  const trimmed = (targetBranch ?? '').trim()
  if (!trimmed) return getGithubRef()
  if (!VALID_BRANCH_NAME.test(trimmed) || trimmed.includes('..') || trimmed.includes('//') || trimmed.endsWith('/')) {
    return null
  }
  return trimmed
}

function parseNewBrandNames(input: unknown): string[] {
  if (!Array.isArray(input)) return []
  return input
    .filter((name): name is string => typeof name === 'string')
    .map(name => name.trim())
    .filter(Boolean)
}

function isDiffEntry(value: unknown): value is TokenDiffEntry {
  return typeof value === 'object' && value !== null && 'kind' in value && 'layer' in value
}

// Only the shape is validated here — whether each brand name actually
// exists (or is being created in the same request) is checked once GitHub
// state is known, alongside the rest of the conflict checks below.
function parseBrandDiffs(input: unknown): Record<string, TokenDiffEntry[]> {
  if (typeof input !== 'object' || input === null) return {}
  const result: Record<string, TokenDiffEntry[]> = {}
  for (const [name, value] of Object.entries(input as Record<string, unknown>)) {
    const trimmed = name.trim()
    if (!trimmed || !Array.isArray(value)) continue
    const entries = value.filter(isDiffEntry)
    if (entries.length > 0) result[trimmed] = entries
  }
  return result
}

// Format/reserved-word/in-request-duplicate checks only — collision against
// brands that already exist on GitHub needs a network read, so that part
// happens later and comes back as a 409 conflict instead.
function validateNewBrandNamesFormat(names: string[]): string | null {
  for (const name of names) {
    const err = validateBrandName(name, [])
    if (err && err !== 'duplicate') return `Invalid brand name "${name}": ${BRAND_NAME_ERROR_MESSAGE.get(err)}`
  }
  const lowerNames = names.map(name => name.toLowerCase())
  if (new Set(lowerNames).size !== lowerNames.length) {
    return 'The same brand name was submitted twice.'
  }
  return null
}

function buildChangeSummary(
  diff: TokenDiffEntry[],
  description: string,
  newBrands: string[],
  brandDiffs: Record<string, TokenDiffEntry[]>,
): string {
  const created = diff.filter(e => e.kind === 'create').map(e => e.newPath!.join('.'))
  const updated = diff.filter(e => e.kind === 'update').map(e => `${e.oldPath!.join('.')} → ${e.newPath!.join('.')}`)
  const deleted = diff.filter(e => e.kind === 'delete').map(e => e.oldPath!.join('.'))

  const lines: string[] = []
  if (description.trim()) lines.push(description.trim(), '')
  if (created.length) lines.push(`**Created:** ${created.join(', ')}`)
  if (updated.length) lines.push(`**Updated:** ${updated.join(', ')}`)
  if (deleted.length) lines.push(`**Deleted:** ${deleted.join(', ')}`)
  if (newBrands.length) lines.push(`**Created brand:** ${newBrands.join(', ')}`)

  for (const name of Object.keys(brandDiffs).sort((a, b) => a.localeCompare(b))) {
    const entries = brandDiffs[name]
    const overridden = entries.filter(e => e.kind === 'create' || e.kind === 'update').map(e => e.newPath!.join('.'))
    const reverted = entries.filter(e => e.kind === 'delete').map(e => e.oldPath!.join('.'))
    if (overridden.length) lines.push(`**${name} — Overridden:** ${overridden.join(', ')}`)
    if (reverted.length) lines.push(`**${name} — Reverted:** ${reverted.join(', ')}`)
  }

  return lines.join('\n')
}

function buildInitialPrBody(
  diff: TokenDiffEntry[],
  description: string,
  newBrands: string[],
  brandDiffs: Record<string, TokenDiffEntry[]>,
): string {
  return [
    "Submitted via the Toky web app — no signed-in identity yet, end-user auth isn't wired up.",
    '',
    buildChangeSummary(diff, description, newBrands, brandDiffs),
  ].join('\n')
}

// The PR stays open across multiple submits (see workingBranchFor) — each one
// appends its own dated section instead of overwriting the description, so
// the PR body reads as a running activity log of everything proposed so far.
function appendPrBodyUpdate(
  existingBody: string,
  diff: TokenDiffEntry[],
  description: string,
  newBrands: string[],
  brandDiffs: Record<string, TokenDiffEntry[]>,
): string {
  const timestamp = new Date().toISOString()
  const summary = buildChangeSummary(diff, description, newBrands, brandDiffs)
  return `${existingBody.trimEnd()}\n\n---\n\n**Additional changes — ${timestamp}**\n\n${summary}`
}

export async function POST(request: Request): Promise<Response> {
  let body: ProposeChangeRequest
  try {
    body = (await request.json()) as ProposeChangeRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { description, targetBranch } = body
  const diff: TokenDiffEntry[] = Array.isArray(body.diff) ? body.diff : []
  const newBrands = parseNewBrandNames(body.newBrands)
  const brandDiffs = parseBrandDiffs(body.brandDiffs)
  const brandDiffNames = Object.keys(brandDiffs)

  if (diff.length === 0 && newBrands.length === 0 && brandDiffNames.length === 0) {
    return NextResponse.json({ error: 'No changes to submit.' }, { status: 400 })
  }

  const brandFormatError = validateNewBrandNamesFormat(newBrands)
  if (brandFormatError) {
    return NextResponse.json({ error: brandFormatError }, { status: 400 })
  }

  const base = resolveTargetBranch(targetBranch)
  if (!base) {
    return NextResponse.json({ error: 'Invalid target branch name.' }, { status: 400 })
  }

  const branch = workingBranchFor(base)

  // Read from wherever the editor itself would've read from for this base —
  // the existing Toky branch if one's already open, otherwise base directly.
  // Using anything else here would desync the conflict check and, worse,
  // silently drop an earlier unmerged submit's changes when reconstructing
  // nextDoc below.
  let readRef
  let meta
  let existingBrands: string[]
  try {
    readRef = await resolveReadRef(base)
    ;[meta, existingBrands] = await Promise.all([getBaseTokensFileMeta(readRef.ref), listTokenBrandFiles(readRef.ref)])
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 })
  }
  const reusingBranch = readRef.status.state === 'pending'

  // A brand's diff can only be applied against a brand that either already
  // exists on GitHub or is being created in this very request — anything
  // else means the client's view of the world is stale (e.g. the brand was
  // deleted since the page loaded).
  const unknownBrand = brandDiffNames.find(name => !newBrands.includes(name) && !existingBrands.includes(name))
  if (unknownBrand) {
    return NextResponse.json({ error: `Brand "${unknownBrand}" no longer exists.` }, { status: 400 })
  }

  const brandsToFetch = brandDiffNames.filter(name => !newBrands.includes(name))
  let brandMetas: Map<string, { sha: string; content: Record<string, unknown> }>
  try {
    const fetched = await Promise.all(brandsToFetch.map(name => getBrandTokensFileMeta(name, readRef.ref)))
    brandMetas = new Map(brandsToFetch.map((name, i) => [name, fetched[i]]))
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 })
  }

  const freshByPath = new Map(flattenTokenDocument(meta.content).map(t => [t.path.join('.'), t]))
  const conflicts: ConflictInfo[] = []

  for (const entry of diff) {
    if (entry.kind === 'create') {
      if (entry.newPath && freshByPath.has(entry.newPath.join('.'))) {
        conflicts.push({ path: entry.newPath.join('.'), reason: 'already-exists' })
      }
      continue
    }

    if (!entry.oldPath) continue
    const current = freshByPath.get(entry.oldPath.join('.'))
    const currentValue = current ? current.rawValue : undefined
    if (JSON.stringify(currentValue) !== JSON.stringify(entry.before)) {
      conflicts.push({ path: entry.oldPath.join('.'), reason: 'changed' })
    }
  }

  // Re-checked here (not just when the brand was staged client-side) since
  // someone else could have created a same-named brand in the meantime —
  // same race-safety reasoning as the token "already-exists" check above.
  for (const name of newBrands) {
    if (validateBrandName(name, existingBrands) === 'duplicate') {
      conflicts.push({ path: name, reason: 'already-exists' })
    }
  }

  // Same shape of check as Base's "changed" branch, scoped to each brand's
  // own sparse file — every brandDiffs entry (create, update, or delete) just
  // means "this path's stored value should match `before`", since a fresh
  // brand's file starts empty and `before` is undefined for anything not
  // already overridden there.
  for (const name of brandDiffNames) {
    const brandMeta = brandMetas.get(name)
    const brandFreshByPath = new Map(flattenTokenDocument(brandMeta?.content ?? {}).map(t => [t.path.join('.'), t]))
    for (const entry of brandDiffs[name]) {
      if (!entry.oldPath && !entry.newPath) continue
      const path = (entry.oldPath ?? entry.newPath)!.join('.')
      const current = brandFreshByPath.get(path)
      const currentValue = current ? current.rawValue : undefined
      if (JSON.stringify(currentValue) !== JSON.stringify(entry.before)) {
        conflicts.push({ path: `${name}: ${path}`, reason: 'changed' })
      }
    }
  }

  if (conflicts.length > 0) {
    return NextResponse.json({ error: 'conflict', conflicts }, { status: 409 })
  }

  const nextDoc = applyDiffToDocument(meta.content, diff)

  try {
    if (!reusingBranch) await createBranch(branch, base)

    if (diff.length > 0) {
      await updateFileOnBranch(
        branch,
        `${JSON.stringify(nextDoc, null, 2)}\n`,
        meta.sha,
        'chore(tokens): update via Toky',
      )
    }

    for (const name of newBrands) {
      // If this same submit also stages overrides for a brand it's creating,
      // write them straight into the initial file instead of creating empty
      // and immediately updating it.
      const initialContent = brandDiffs[name] ? applyDiffToDocument({}, brandDiffs[name]) : null
      if (initialContent) {
        await createFileOnBranch(
          branch,
          brandFilePath(name),
          `${JSON.stringify(initialContent, null, 2)}\n`,
          `chore(tokens): add ${name} brand`,
        )
      } else {
        await createBrandFile(branch, name)
      }
      // Wires the new brand into the CSS build in the same PR — see
      // apps/toky/docs/adr/0001-auto-patch-brands-array-on-create.md. Throws
      // (failing this whole submit) if the expected pattern isn't found,
      // rather than silently leaving the brand file unwired into the build.
      await addBrandToIndex(branch, name)
    }

    for (const name of brandsToFetch) {
      const brandMeta = brandMetas.get(name)!
      const nextBrandDoc = applyDiffToDocument(brandMeta.content, brandDiffs[name])
      await updateFileAtPath(
        branch,
        brandFilePath(name),
        `${JSON.stringify(nextBrandDoc, null, 2)}\n`,
        brandMeta.sha,
        `chore(tokens): update ${name} brand via Toky`,
      )
    }

    // Every submit ships its own changeset, same as any other change to this
    // repo — the token package's release notes shouldn't depend on someone
    // remembering to add one by hand. Timestamped so a second submit onto
    // the same branch adds its own entry rather than clobbering the first.
    const changesetPath = `.changeset/${branch.replace(/\//g, '-')}-${Date.now()}.md`
    await createFileOnBranch(
      branch,
      changesetPath,
      buildChangesetContent(diff, description, newBrands, brandDiffs),
      'chore: add changeset for token update',
    )

    // Reusing an already-open PR: refetch it for its current body (not just
    // the url/number resolveReadRef already found) and append this submit's
    // changes to it, rather than leaving the description frozen at whatever
    // it said when the PR was first opened.
    const existingPr = reusingBranch ? await findOpenPullRequest(branch) : null

    const pr = existingPr
      ? await updatePullRequestBody(
          existingPr.number,
          appendPrBodyUpdate(existingPr.body, diff, description, newBrands, brandDiffs),
        ).then(() => existingPr)
      : await openPullRequest(
          branch,
          '🎨 Update design tokens via Toky',
          buildInitialPrBody(diff, description, newBrands, brandDiffs),
          base,
        )

    return NextResponse.json({ url: pr.url, number: pr.number }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 })
  }
}
