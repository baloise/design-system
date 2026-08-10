import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { BRAND_NAME_ERROR_MESSAGE, validateBrandName } from '@/src/tokens/brand'
import { buildChangesetContent } from '@/src/tokens/changeset'
import { applyDiffToDocument } from '@/src/tokens/edit'
import type { TokenDiffEntry } from '@/src/tokens/edit'
import { flattenTokenDocument } from '@/src/tokens/flatten'
import { formatValue } from '@/src/tokens/format'
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
  // Dot-joined paths of every diff/brandDiffs entry that originated from a
  // Pull (from Figma) rather than a manual edit — see docs/adr/0002. Purely
  // cosmetic (labels the PR body), never affects what gets written.
  pulledPaths?: string[]
}

function parsePulledPaths(input: unknown): Set<string> {
  if (!Array.isArray(input)) return new Set()
  return new Set(input.filter((path): path is string => typeof path === 'string'))
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
  // `name` is a brand name straight from the request body — collect
  // [name, entries] pairs and hand them to Object.fromEntries in one shot
  // at the end, rather than writing each one onto `result` as we go
  // (`result[trimmed] = entries`), which is a property write keyed by
  // untrusted input regardless of how it's spelled.
  const pairs: [string, TokenDiffEntry[]][] = []
  for (const [name, value] of Object.entries(input as Record<string, unknown>)) {
    const trimmed = name.trim()
    if (!trimmed || !Array.isArray(value)) continue
    const entries = value.filter(isDiffEntry)
    if (entries.length > 0) pairs.push([trimmed, entries])
  }
  return Object.fromEntries(pairs)
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

interface SummaryEntry {
  path: string
  text: string
}

// A TokenDiffEntry's `value`/`before` are either a literal DTCG value or,
// for a reference-kind token, a "{dotted.path}" string (see edit.ts's
// effectiveValue) — rendered as an arrow to the target instead of the raw
// braces, everything else falls through to formatValue's hex/number/string
// handling.
const REFERENCE_PATTERN = /^\{(.+)\}$/

function formatEntryValue(value: unknown): string {
  if (typeof value === 'string') {
    const match = REFERENCE_PATTERN.exec(value)
    if (match) return `→ ${match[1].split('.').join('/')}`
  }
  return formatValue(value)
}

function describeCreate(entry: TokenDiffEntry): string {
  return `${entry.newPath!.join('.')} = ${formatEntryValue(entry.value)}`
}

function describeUpdate(entry: TokenDiffEntry): string {
  const oldPath = entry.oldPath!.join('.')
  const newPath = entry.newPath!.join('.')
  const renamed = oldPath !== newPath
  const valueChanged = JSON.stringify(entry.value) !== JSON.stringify(entry.before)

  const pathPart = renamed ? `${oldPath} → ${newPath}` : oldPath
  if (valueChanged) {
    return `${pathPart}: ${formatEntryValue(entry.before)} → ${formatEntryValue(entry.value)}`
  }
  // Value (and path) unchanged but still staged as an update — this is a
  // Pull (from Figma) adoption backfilling a token's variableId with
  // nothing else to show for it (see figma-pull.ts's buildBasePullPlan).
  if (entry.figmaId) {
    return `${pathPart} (linked to Figma variable ${entry.figmaId}, value unchanged)`
  }
  return pathPart
}

function describeDelete(entry: TokenDiffEntry): string {
  return `${entry.oldPath!.join('.')} (was ${formatEntryValue(entry.before)})`
}

function buildChangeSummary(
  diff: TokenDiffEntry[],
  description: string,
  newBrands: string[],
  brandDiffs: Record<string, TokenDiffEntry[]>,
  pulledPaths: Set<string> = new Set(),
): string {
  const lines: string[] = []
  if (description.trim()) lines.push(description.trim(), '')

  // Splits entries into "manual" vs. "via Figma pull" (see docs/adr/0002)
  // and appends one line per non-empty group, so a pull-heavy submit reads
  // distinctly from a hand-edited one in the PR body.
  function pushGroup(label: string, entries: SummaryEntry[]) {
    const own = entries.filter(e => !pulledPaths.has(e.path)).map(e => e.text)
    const pulled = entries.filter(e => pulledPaths.has(e.path)).map(e => e.text)
    if (own.length) lines.push(`**${label}:**\n- ${own.join('\n- ')}`)
    if (pulled.length) lines.push(`**${label} (via Figma pull):**\n- ${pulled.join('\n- ')}`)
  }

  const created = diff
    .filter(e => e.kind === 'create')
    .map(e => ({ path: e.newPath!.join('.'), text: describeCreate(e) }))
  const updated = diff
    .filter(e => e.kind === 'update')
    .map(e => ({ path: e.oldPath!.join('.'), text: describeUpdate(e) }))
  const deleted = diff
    .filter(e => e.kind === 'delete')
    .map(e => ({ path: e.oldPath!.join('.'), text: describeDelete(e) }))

  pushGroup('Created', created)
  pushGroup('Updated', updated)
  pushGroup('Deleted', deleted)
  if (newBrands.length) lines.push(`**Created brand:** ${newBrands.join(', ')}`)

  for (const name of Object.keys(brandDiffs).sort((a, b) => a.localeCompare(b))) {
    const entries = brandDiffs[name]
    const overridden = entries
      .filter(e => e.kind === 'create' || e.kind === 'update')
      .map(e => ({ path: e.newPath!.join('.'), text: e.kind === 'create' ? describeCreate(e) : describeUpdate(e) }))
    const reverted = entries
      .filter(e => e.kind === 'delete')
      .map(e => ({ path: e.oldPath!.join('.'), text: describeDelete(e) }))
    pushGroup(`${name} — Overridden`, overridden)
    pushGroup(`${name} — Reverted`, reverted)
  }

  return lines.join('\n')
}

function buildInitialPrBody(
  diff: TokenDiffEntry[],
  description: string,
  newBrands: string[],
  brandDiffs: Record<string, TokenDiffEntry[]>,
  pulledPaths: Set<string>,
  submitter: string,
): string {
  return [
    `Submitted via the Toky web app by @${submitter}.`,
    '',
    buildChangeSummary(diff, description, newBrands, brandDiffs, pulledPaths),
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
  pulledPaths: Set<string>,
  submitter: string,
): string {
  const timestamp = new Date().toISOString()
  const summary = buildChangeSummary(diff, description, newBrands, brandDiffs, pulledPaths)
  return `${existingBody.trimEnd()}\n\n---\n\n**Additional changes by @${submitter} — ${timestamp}**\n\n${summary}`
}

export async function POST(request: Request): Promise<Response> {
  // Identity for PR attribution comes only from the server-side session —
  // never from the request body — and proxy.ts guarantees every request
  // reaching this route is already authenticated (see docs/adr/0003). Still
  // guarded here rather than asserted, since this route can also be hit
  // directly in tests/local dev without middleware in front of it.
  const session = await auth()
  const submitter = session?.user.login
  if (!submitter) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: ProposeChangeRequest
  try {
    body = (await request.json()) as ProposeChangeRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { description, targetBranch } = body
  const pulledPaths = parsePulledPaths(body.pulledPaths)
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
          appendPrBodyUpdate(existingPr.body, diff, description, newBrands, brandDiffs, pulledPaths, submitter),
        ).then(() => existingPr)
      : await openPullRequest(
          branch,
          '🎨 Update design tokens via Toky',
          buildInitialPrBody(diff, description, newBrands, brandDiffs, pulledPaths, submitter),
          base,
        )

    return NextResponse.json({ url: pr.url, number: pr.number }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 })
  }
}
