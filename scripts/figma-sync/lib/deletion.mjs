/**
 * Deletion detection for Pull (docs/adr/0019-pull-auto-deletes-figma-variables.md).
 *
 * Deliberately baseline-relative, not "any Figma variable with no matching
 * token": a Figma variable that was never in our last-synced baseline
 * might be a designer's brand-new, not-yet-synced creation — the plugin's
 * Push flow's job to pick up (docs/adr/0016-github-action-supersedes-plugin-pull.md),
 * not something this Action has ever owned or should delete out from under
 * them. Only a variableId this run's baseline previously recorded, and
 * that the current token tree no longer has, is safe to auto-delete.
 */
import { flattenVariableId } from './figma-value.mjs'

/**
 * @param {import('./baseline.mjs').SyncState | null} existingState
 * @param {import('./tokens.mjs').Token[]} currentBaseTokens the just-merged tree's tokens
 * @returns {string[]} variableIds safe to delete in Figma
 */
export function findRemovedVariableIds(existingState, currentBaseTokens) {
  if (!existingState) return []

  // flattenVariableId turns a shadow token's 5-sub-id object into 5 plain
  // ids (and a normal token's single string into a 1-element list) — see
  // docs/plans/shadow-token-type-plan.md.
  const currentIds = new Set(currentBaseTokens.flatMap(t => flattenVariableId(t.variableId).map(({ id }) => id)))
  return Object.keys(existingState.entries).filter(id => !currentIds.has(id))
}

export function buildDeleteVariablesPayload(removedVariableIds) {
  return { variables: removedVariableIds.map(id => ({ action: 'DELETE', id })) }
}
