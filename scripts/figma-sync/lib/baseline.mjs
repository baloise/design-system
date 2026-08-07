/**
 * Pure logic for Phase 3's write-back commit
 * (docs/adr/0017-direct-commit-variableid-backfill.md): patching new
 * variableIds into a token tree, and building the updated
 * .figma-sync-state.json baseline (docs/adr/0015-git-committed-sync-baseline.md).
 * No network/filesystem here — see lib/github.mjs for the Git Data API
 * calls that use this module's output.
 */
import { existsSync, readFileSync } from 'node:fs'
import { pathKey } from './alias.mjs'

/** Tolerant of a missing file — there is no baseline yet on a repo's first-ever sync. */
export function loadSyncStateFile(path) {
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf-8'))
}

function getNodeAtPath(tree, path) {
  let node = tree
  for (const segment of path) {
    node = node?.[segment]
  }
  return node
}

/**
 * Returns a patched copy of the token tree with `$extensions` set for
 * every newly-created token — variableId always; scopes only if the token
 * didn't already carry one (an existing token's scopes are Figma's to
 * manage from here on, not this backfill's).
 */
export function applyVariableIdPatch(tree, newIds) {
  const patched = structuredClone(tree)

  for (const { path, variableId } of newIds) {
    const node = getNodeAtPath(patched, path)
    if (!node || typeof node !== 'object' || !('$value' in node)) {
      throw new Error(`applyVariableIdPatch: no token leaf found at path ${pathKey(path)}`)
    }
    node.$extensions = {
      ...(node.$extensions ?? {}),
      'com.figma.variableId': variableId,
      'com.figma.scopes': node.$extensions?.['com.figma.scopes'] ?? ['ALL_SCOPES'],
    }
  }

  return patched
}

/**
 * Builds the full `.figma-sync-state.json` baseline after a sync run: one
 * entry per token, keyed by its (now-real, never temp) variableId. Carries
 * forward any existing entries for tokens this run didn't touch — a sync
 * only ever adds/updates entries for tokens it actually resolved, it never
 * drops history for tokens outside this run's token set (there shouldn't
 * be any, since baseTokens always covers the full tree, but this keeps the
 * function correct even if called with a partial list). `removedVariableIds`
 * (docs/adr/0019-pull-auto-deletes-figma-variables.md) drops entries for
 * tokens this run deleted from Figma — applied before the additions above,
 * so a variableId that was both removed and (somehow) reused in the same
 * run ends up with the new entry, not silently dropped.
 */
export function buildSyncState({ existingState, baseTokens, mergeCommitSha, syncedAt, removedVariableIds = [] }) {
  const entries = { ...(existingState?.entries ?? {}) }

  for (const id of removedVariableIds) {
    delete entries[id]
  }

  for (const token of baseTokens) {
    if (!token.variableId) {
      throw new Error(`buildSyncState: token ${pathKey(token.path)} has no variableId — patch ids before building the baseline.`)
    }
    entries[token.variableId] = {
      tokenPath: token.path,
      resolvedValue: token.value,
      lastModifiedSource: 'code',
      lastModifiedAt: syncedAt,
    }
  }

  return { lastSyncedCommit: mergeCommitSha, lastSyncedAt: syncedAt, entries }
}
