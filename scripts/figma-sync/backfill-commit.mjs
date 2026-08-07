#!/usr/bin/env node
/**
 * Entry point for figma-sync.yml's write-back step
 * (docs/adr/0017-direct-commit-variableid-backfill.md): patches new
 * variableIds into Base.tokens.json and/or drops deleted tokens'
 * (docs/adr/0019-pull-auto-deletes-figma-variables.md) entries from
 * packages/tokens/.figma-sync-state.json, as one atomic direct commit to
 * `next` (docs/adr/0014-git-data-api-atomic-commits.md) — no PR. Commits
 * only the file(s) that actually changed: a deletion-only run never
 * touches Base.tokens.json — the token was already gone once the Toky PR
 * merged, there's nothing here to patch.
 *
 * Reads NEW_IDS / REMOVED_IDS (JSON, from pull.mjs's outputs) and
 * MERGE_COMMIT_SHA (the Toky PR's merge commit — `github.event.pull_request.merge_commit_sha`)
 * from the environment. Run with: node scripts/figma-sync/backfill-commit.mjs
 */
import { applyVariableIdPatch, buildSyncState } from './lib/baseline.mjs'
import { commitFiles, getFileContent } from './lib/github.mjs'
import { flattenTokens } from './lib/tokens.mjs'

const TOKEN_FILE_PATH = 'packages/tokens/tokens/Base.tokens.json'
const SYNC_STATE_PATH = 'packages/tokens/.figma-sync-state.json'

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set.`)
  return value
}

async function main() {
  const newIds = process.env.NEW_IDS ? JSON.parse(process.env.NEW_IDS) : []
  const removedIds = process.env.REMOVED_IDS ? JSON.parse(process.env.REMOVED_IDS) : []

  if (newIds.length === 0 && removedIds.length === 0) {
    console.log('No new or removed variableIds — nothing to commit.')
    return
  }

  const token = requireEnv('GITHUB_TOKEN')
  const mergeCommitSha = requireEnv('MERGE_COMMIT_SHA')
  const branch = process.env.TARGET_BRANCH ?? 'next'
  const syncedAt = new Date().toISOString()

  const files = []
  let patchedTokens = []

  if (newIds.length > 0) {
    const baseFile = await getFileContent(TOKEN_FILE_PATH, branch, token)
    if (!baseFile) throw new Error(`${TOKEN_FILE_PATH} not found on ${branch}.`)
    const patchedTree = applyVariableIdPatch(JSON.parse(baseFile.content), newIds)
    patchedTokens = flattenTokens(patchedTree)
    files.push({ path: TOKEN_FILE_PATH, content: JSON.stringify(patchedTree, null, 2) + '\n' })
  }

  const stateFile = await getFileContent(SYNC_STATE_PATH, branch, token)
  const existingState = stateFile ? JSON.parse(stateFile.content) : null

  const syncState = buildSyncState({ existingState, baseTokens: patchedTokens, mergeCommitSha, syncedAt, removedVariableIds: removedIds })
  files.push({ path: SYNC_STATE_PATH, content: JSON.stringify(syncState, null, 2) + '\n' })

  const messageParts = []
  if (newIds.length > 0) messageParts.push(`back-fill ${newIds.length} Figma variableId(s)`)
  if (removedIds.length > 0) messageParts.push(`drop ${removedIds.length} deleted Figma variable(s) from the baseline`)

  const result = await commitFiles({
    branch,
    files,
    message: `chore(tokens): ${messageParts.join(', ')}\n\nAutomated — see docs/adr/0017-direct-commit-variableid-backfill.md.`,
    token,
  })

  console.log(`Committed to ${branch}: ${result.sha} (${messageParts.join(', ')})`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
