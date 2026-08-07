#!/usr/bin/env node
/**
 * Entry point for figma-conflict-check.yml (docs/plans/figma-sync-action-plan.md §4).
 * Runs on the open toky/update-next PR: reads the PR branch's own checked-out
 * token files + local .figma-sync-state.json baseline, cross-checks against
 * live Figma variable values, and posts/updates a single PR comment listing
 * any conflicts. Never fails the check itself
 * (docs/adr/0018-non-blocking-conflict-check.md) — a script error still
 * exits non-zero (that's a real operational problem to surface), but
 * finding conflicts never does.
 *
 * Run with: node scripts/figma-sync/conflict-check.mjs
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSyncStateFile } from './lib/baseline.mjs'
import { buildCommentBody, COMMENT_MARKER, findConflicts } from './lib/conflict.mjs'
import { findCollectionAndModes, getLocalVariables } from './lib/figma.mjs'
import { createIssueComment, findMarkedComment, updateIssueComment } from './lib/github.mjs'
import { flattenTokens, loadTokenFile } from './lib/tokens.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '../..')
const TOKENS_DIR = resolve(workspaceRoot, 'packages/tokens/tokens')
const SYNC_STATE_FILE = resolve(TOKENS_DIR, '..', '.figma-sync-state.json')

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set.`)
  return value
}

async function main() {
  const prNumber = requireEnv('PR_NUMBER')
  const githubToken = requireEnv('GITHUB_TOKEN')
  const figmaToken = requireEnv('FIGMA_API_TOKEN')
  const figmaFileKey = requireEnv('FIGMA_FILE_KEY')

  const base = loadTokenFile(resolve(TOKENS_DIR, 'Base.tokens.json'))
  const currentBaseTokens = flattenTokens(base)
  const existingState = loadSyncStateFile(SYNC_STATE_FILE)

  const localVariables = await getLocalVariables(figmaFileKey, figmaToken)
  const { modeIdByBrand } = findCollectionAndModes(localVariables, [])

  const conflicts = findConflicts({
    existingState,
    currentBaseTokens,
    figmaVariablesById: localVariables.variables,
    modeId: modeIdByBrand.Base,
  })

  console.log(`Found ${conflicts.length} conflict(s).`)

  const body = buildCommentBody(conflicts)
  const existingComment = await findMarkedComment(prNumber, COMMENT_MARKER, githubToken)
  if (existingComment) {
    await updateIssueComment(existingComment.id, body, githubToken)
  } else {
    await createIssueComment(prNumber, body, githubToken)
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
