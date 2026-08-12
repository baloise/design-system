import type { TokenDiffEntry } from './edit'

// Toky only ever touches the tokens package's source file.
const CHANGESET_PACKAGE = '@baloise/ds-tokens'

export type ChangesetBumpLevel = 'patch' | 'minor' | 'major'

// A deleted token can break anything still referencing it downstream (major);
// a new token (or brand — purely additive, same as a new token) is minor;
// anything else is just value edits (patch). Mirrors the bump-level
// reasoning in scripts/create-changeset.mjs.
export function bumpLevelForDiff(diff: TokenDiffEntry[], newBrands: string[] = []): ChangesetBumpLevel {
  if (diff.some(entry => entry.kind === 'delete')) return 'major'
  if (diff.some(entry => entry.kind === 'create') || newBrands.length > 0) return 'minor'
  return 'patch'
}

function summarizeDiff(
  diff: TokenDiffEntry[],
  newBrands: string[],
  brandDiffs: Record<string, TokenDiffEntry[]>,
): string {
  const created = diff.filter(entry => entry.kind === 'create').length
  const updated = diff.filter(entry => entry.kind === 'update').length
  const deleted = diff.filter(entry => entry.kind === 'delete').length

  const parts: string[] = []
  if (created) parts.push(`${created} created`)
  if (updated) parts.push(`${updated} updated`)
  if (deleted) parts.push(`${deleted} deleted`)

  const tokenSummary = parts.length ? `${parts.join(', ')} design token${diff.length === 1 ? '' : 's'}.` : ''
  const brandSummary = newBrands.length
    ? `Add the ${newBrands.join(', ')} brand${newBrands.length === 1 ? '' : 's'}.`
    : ''
  const brandOverrideCount = Object.values(brandDiffs).reduce((sum, d) => sum + d.length, 0)
  const brandOverrideSummary = brandOverrideCount
    ? `${brandOverrideCount} brand override${brandOverrideCount === 1 ? '' : 's'}.`
    : ''

  return [tokenSummary, brandSummary, brandOverrideSummary].filter(Boolean).join(' ')
}

// The per-token breakdown under the summary — same grouping as the staged
// changes sidebar list, so the changeset reads the same way. A rename shows
// as "old → new"; a plain value update has nothing to arrow to, so it's just
// the one path.
function describeDiffByKind(diff: TokenDiffEntry[]): string[] {
  const created = diff.filter(entry => entry.kind === 'create').map(entry => entry.newPath!.join('/'))
  const updated = diff
    .filter(entry => entry.kind === 'update')
    .map(entry => {
      const oldPath = entry.oldPath!.join('/')
      const newPath = entry.newPath!.join('/')
      return oldPath === newPath ? newPath : `${oldPath} → ${newPath}`
    })
  const deleted = diff.filter(entry => entry.kind === 'delete').map(entry => entry.oldPath!.join('/'))

  const lines: string[] = []
  if (created.length) lines.push(`**Created:** ${created.join(', ')}`)
  if (updated.length) lines.push(`**Updated:** ${updated.join(', ')}`)
  if (deleted.length) lines.push(`**Deleted:** ${deleted.join(', ')}`)
  return lines
}

// A brand's diff is computed against its own sparse file, so 'create'/'update'
// both just mean "now overridden" there, and 'delete' means "reverted to
// Base" — different vocabulary than describeDiffByKind's Base-relative one.
function describeBrandDiffs(brandDiffs: Record<string, TokenDiffEntry[]>): string[] {
  const lines: string[] = []
  for (const name of Object.keys(brandDiffs).sort((a, b) => a.localeCompare(b))) {
    const entries = brandDiffs[name]
    const overridden = entries.filter(e => e.kind === 'create' || e.kind === 'update').map(e => e.newPath!.join('/'))
    const reverted = entries.filter(e => e.kind === 'delete').map(e => e.oldPath!.join('/'))
    if (overridden.length) lines.push(`**${name} — Overridden:** ${overridden.join(', ')}`)
    if (reverted.length) lines.push(`**${name} — Reverted:** ${reverted.join(', ')}`)
  }
  return lines
}

// Matches the format scripts/create-changeset.mjs writes — frontmatter mapping
// the package to a bump level, then a `**scope**: summary` body line, followed
// by the created/updated/deleted breakdown (and, if any, the created brands).
export function buildChangesetContent(
  diff: TokenDiffEntry[],
  description: string,
  newBrands: string[] = [],
  brandDiffs: Record<string, TokenDiffEntry[]> = {},
): string {
  const bumpLevel = bumpLevelForDiff(diff, newBrands)
  const summary = description.trim() || summarizeDiff(diff, newBrands, brandDiffs)
  const brandLines = newBrands.length ? [`**Created brand:** ${newBrands.join(', ')}`] : []
  const bodyLines = [
    `**tokens**: ${summary}`,
    '',
    ...describeDiffByKind(diff),
    ...brandLines,
    ...describeBrandDiffs(brandDiffs),
  ]

  return `---
'${CHANGESET_PACKAGE}': ${bumpLevel}
---

${bodyLines.join('\n')}
`
}
