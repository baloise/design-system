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
 * Reads NEW_IDS / REMOVED_IDS (JSON, from pull.mjs's outputs) from the
 * environment. Run with: node scripts/figma-sync/backfill-commit.mjs
 *
 * TOKENS_DIR_OVERRIDE (optional, shared with pull.mjs/conflict-check.mjs):
 * switches out of the real GitHub API entirely — no GITHUB_TOKEN needed.
 * Reads/writes the patched files directly at this path (can point at the
 * real packages/tokens/tokens, or a scratch copy). Two local sub-modes:
 *   - default: just writes the files to disk, no commit — same as every
 *     other change in this repo, left unstaged for you to review and
 *     commit yourself.
 *   - LOCAL_GIT_COMMIT=true: also runs a real `git commit` via the CLI
 *     (TOKENS_DIR_OVERRIDE must point inside a git working tree).
 * Never set either in figma-sync.yml.
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { applyVariableIdPatch, buildSyncState, loadSyncStateFile } from './lib/baseline.mjs'
import { commitFiles, getFileContent } from './lib/github.mjs'
import { commitFilesLocally } from './lib/local-git.mjs'
import { flattenTokens, loadTokenFile } from './lib/tokens.mjs'

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set.`)
  return value
}

async function runRemote({ newIds, removedIds, syncedAt }) {
  const TOKEN_FILE_PATH = 'packages/tokens/tokens/Base.tokens.json'
  const SYNC_STATE_PATH = 'packages/tokens/.figma-sync-state.json'

  const token = requireEnv('GITHUB_TOKEN')
  const mergeCommitSha = requireEnv('MERGE_COMMIT_SHA')
  const branch = process.env.TARGET_BRANCH ?? 'next'

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
  const syncState = buildSyncState({
    existingState,
    baseTokens: patchedTokens,
    mergeCommitSha,
    syncedAt,
    removedVariableIds: removedIds,
  })
  files.push({ path: SYNC_STATE_PATH, content: JSON.stringify(syncState, null, 2) + '\n' })

  const message = buildCommitMessage(newIds, removedIds)
  const result = await commitFiles({ branch, files, message, token })
  console.log(`Committed to ${branch}: ${result.sha} (${message.split('\n')[0]})`)
}

function patchLocalFiles({ newIds, removedIds, syncedAt }) {
  const tokensDir = resolve(process.env.TOKENS_DIR_OVERRIDE)
  const mergeCommitSha = process.env.MERGE_COMMIT_SHA ?? 'local-test'

  const files = []
  let patchedTokens = []

  if (newIds.length > 0) {
    const baseTree = loadTokenFile(resolve(tokensDir, 'Base.tokens.json'))
    const patchedTree = applyVariableIdPatch(baseTree, newIds)
    patchedTokens = flattenTokens(patchedTree)
    files.push({ path: 'tokens/Base.tokens.json', content: JSON.stringify(patchedTree, null, 2) + '\n' })
  }

  const existingState = loadSyncStateFile(resolve(tokensDir, '..', '.figma-sync-state.json'))
  const syncState = buildSyncState({
    existingState,
    baseTokens: patchedTokens,
    mergeCommitSha,
    syncedAt,
    removedVariableIds: removedIds,
  })
  files.push({ path: '.figma-sync-state.json', content: JSON.stringify(syncState, null, 2) + '\n' })

  return { tokensDir, files, message: buildCommitMessage(newIds, removedIds) }
}

function runLocalWriteOnly(input) {
  const { tokensDir, files } = patchLocalFiles(input)
  const repoRoot = resolve(tokensDir, '..')

  for (const file of files) {
    writeFileSync(resolve(repoRoot, file.path), file.content)
  }

  console.log(
    `Wrote ${files.map(f => f.path).join(', ')} at ${repoRoot} — not committed, review with \`git diff\` and commit yourself.`,
  )
}

function runLocalGitCommit(input) {
  const { tokensDir, files, message } = patchLocalFiles(input)
  const repoRoot = resolve(tokensDir, '..')
  const result = commitFilesLocally({ repoRoot, files, message })
  console.log(`Committed locally at ${repoRoot}: ${result.sha} (${message.split('\n')[0]})`)
}

function buildCommitMessage(newIds, removedIds) {
  const parts = []
  if (newIds.length > 0) parts.push(`back-fill ${newIds.length} Figma variableId(s)`)
  if (removedIds.length > 0) parts.push(`drop ${removedIds.length} deleted Figma variable(s) from the baseline`)
  return `chore(tokens): ${parts.join(', ')}\n\nAutomated — see docs/adr/0017-direct-commit-variableid-backfill.md.`
}

async function main() {
  const newIds = process.env.NEW_IDS ? JSON.parse(process.env.NEW_IDS) : []
  const removedIds = process.env.REMOVED_IDS ? JSON.parse(process.env.REMOVED_IDS) : []

  if (newIds.length === 0 && removedIds.length === 0) {
    console.log('No new or removed variableIds — nothing to write.')
    return
  }

  const syncedAt = new Date().toISOString()

  if (!process.env.TOKENS_DIR_OVERRIDE) {
    await runRemote({ newIds, removedIds, syncedAt })
  } else if (process.env.LOCAL_GIT_COMMIT === 'true') {
    runLocalGitCommit({ newIds, removedIds, syncedAt })
  } else {
    runLocalWriteOnly({ newIds, removedIds, syncedAt })
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
