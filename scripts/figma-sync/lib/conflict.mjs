/**
 * Conflict detection for the open-PR check (docs/plans/figma-sync-action-plan.md §4):
 * a token whose Figma value *and* GitHub value have both diverged from the
 * sync baseline since the last sync (packages/tokens/CONTEXT.md's
 * "Conflict" entry) — as opposed to a one-sided change, which is just what
 * Pull is about to resolve once this PR merges.
 *
 * Scoped to literal-valued tokens (color/number/string) and the Base mode
 * only. Reference-kind (alias) conflicts and brand-mode-aware conflicts
 * both need a variableId->path reverse lookup and a per-brand pass this
 * check doesn't build yet — a real, stated limitation, not a silent gap
 * (docs/plans/figma-sync-action-plan.md §8 territory, not attempted here).
 */
import { figmaValueFor } from './figma-value.mjs'

export const COMMENT_MARKER = '<!-- figma-sync-conflict-check -->'

/**
 * @param {object} params
 * @param {import('./baseline.mjs').SyncState | null} params.existingState
 * @param {import('./tokens.mjs').Token[]} params.currentBaseTokens the PR's proposed Base tree
 * @param {Record<string, { valuesByMode: Record<string, unknown> }>} params.figmaVariablesById
 * @param {string} params.modeId Figma's Base mode id
 */
export function findConflicts({ existingState, currentBaseTokens, figmaVariablesById, modeId }) {
  if (!existingState) return []

  const conflicts = []

  for (const token of currentBaseTokens) {
    if (!token.variableId || token.value.kind !== 'literal') continue

    const baseline = existingState.entries[token.variableId]
    if (!baseline || baseline.resolvedValue?.kind !== 'literal') continue

    const figmaVariable = figmaVariablesById[token.variableId]
    const figmaLiveValue = figmaVariable?.valuesByMode?.[modeId]
    if (figmaLiveValue === undefined) continue // never synced, or since deleted — not a conflict

    const baselineFigmaShape = figmaValueFor(token.type, baseline.resolvedValue.value)
    const currentFigmaShape = figmaValueFor(token.type, token.value.value)

    const githubChanged = JSON.stringify(currentFigmaShape) !== JSON.stringify(baselineFigmaShape)
    const figmaChanged = JSON.stringify(figmaLiveValue) !== JSON.stringify(baselineFigmaShape)
    // Both sides moving to the *same* value isn't a conflict — nothing
    // would actually be overwritten by merging.
    const disagree = JSON.stringify(currentFigmaShape) !== JSON.stringify(figmaLiveValue)

    if (githubChanged && figmaChanged && disagree) {
      conflicts.push({
        variableId: token.variableId,
        tokenPath: token.path,
        baselineValue: baselineFigmaShape,
        githubValue: currentFigmaShape,
        figmaValue: figmaLiveValue,
      })
    }
  }

  return conflicts
}

export function buildCommentBody(conflicts) {
  if (conflicts.length === 0) {
    return `${COMMENT_MARKER}\n### 🔍 Figma Conflict Check\n\nNo conflicts detected — every touched token's Figma value matches the last sync baseline.`
  }

  const rows = conflicts
    .map(c => `| \`${c.tokenPath.join('.')}\` | \`${JSON.stringify(c.baselineValue)}\` | \`${JSON.stringify(c.githubValue)}\` | \`${JSON.stringify(c.figmaValue)}\` |`)
    .join('\n')

  return (
    `${COMMENT_MARKER}\n### 🔍 Figma Conflict Check\n\n` +
    `⚠️ ${conflicts.length} token(s) changed in both this PR and Figma since the last sync. ` +
    `Merging will overwrite the Figma-side change (this check is informational — it does not block merge; see docs/adr/0018-non-blocking-conflict-check.md).\n\n` +
    `| Token | Last synced | This PR | Figma (current) |\n| --- | --- | --- | --- |\n${rows}`
  )
}
