#!/usr/bin/env node
/**
 * Entry point for figma-sync.yml's sync job (docs/plans/figma-sync-action-plan.md §5).
 *
 * Defaults to a dry run (resolves every brand, reports what Pull would do,
 * writes nothing) unless DRY_RUN=false is set explicitly — this is the
 * safety default so a local/manual invocation can never accidentally write
 * to a real Figma file. figma-sync.yml sets DRY_RUN=false for the real run.
 *
 * Run with: node scripts/figma-sync/pull.mjs
 *
 * TOKENS_DIR_OVERRIDE (optional): point at a scratch tokens directory
 * instead of packages/tokens/tokens — for local sandbox-Figma-file testing
 * only, where the real committed variableIds (which belong to the real
 * production file) would otherwise get rejected by an empty/different
 * target file. Never set in figma-sync.yml.
 */
import { appendFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSyncStateFile } from './lib/baseline.mjs'
import { buildBootstrapPayload, resolveBootstrapIds } from './lib/bootstrap.mjs'
import { buildDeleteVariablesPayload, findRemovedVariableIds } from './lib/deletion.mjs'
import { buildNameIndex, findCollectionAndModes, getLocalVariables, postVariables } from './lib/figma.mjs'
import { brandFilePath, flattenTokens, listBrandNames, loadTokenFile, mergeBrandTree } from './lib/tokens.mjs'
import {
  assignVariableIds,
  buildAliasPassPayload,
  buildCreatePassPayload,
  collectNewlyCreatedIds,
  resolveTempIds,
} from './lib/write.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '../..')
const TOKENS_DIR = process.env.TOKENS_DIR_OVERRIDE
  ? resolve(process.env.TOKENS_DIR_OVERRIDE)
  : resolve(workspaceRoot, 'packages/tokens/tokens')
const SYNC_STATE_FILE = resolve(TOKENS_DIR, '..', '.figma-sync-state.json')

function resolveBrandTrees() {
  const base = loadTokenFile(resolve(TOKENS_DIR, 'Base.tokens.json'))
  const baseTokens = flattenTokens(base)
  const brandNames = listBrandNames(TOKENS_DIR)

  const brandTokensByName = { Base: baseTokens }
  for (const brandName of brandNames) {
    const override = loadTokenFile(brandFilePath(TOKENS_DIR, brandName))
    brandTokensByName[brandName] = flattenTokens(mergeBrandTree(base, override))
  }

  return { baseTokens, brandNames, brandTokensByName }
}

function summarizeBrand(brandName, tokens) {
  const withId = tokens.filter(t => t.variableId).length
  console.log(
    `  ${brandName}: ${tokens.length} tokens (${withId} existing variableId, ${tokens.length - withId} to create)`,
  )
}

async function dryRun({ baseTokens, brandTokensByName }, figmaToken, figmaFileKey) {
  console.log(`Resolved token trees (dry run — no writes):`)
  for (const [brandName, tokens] of Object.entries(brandTokensByName)) {
    summarizeBrand(brandName, tokens)
  }

  if (!figmaToken || !figmaFileKey) {
    console.log('\nFIGMA_API_TOKEN/FIGMA_FILE_KEY not set — skipping live Figma comparison (local dry run).')
    return
  }

  const { variables } = await getLocalVariables(figmaFileKey, figmaToken)
  const figmaVariableIds = new Set(Object.values(variables).map(v => v.id))
  const tokenVariableIds = new Set(baseTokens.filter(t => t.variableId).map(t => t.variableId))

  const missingInFigma = [...tokenVariableIds].filter(id => !figmaVariableIds.has(id))
  const missingInTokens = [...figmaVariableIds].filter(id => !tokenVariableIds.has(id))

  console.log(`\nFigma file has ${figmaVariableIds.size} variables.`)
  if (missingInFigma.length > 0) {
    console.log(
      `  ${missingInFigma.length} token variableId(s) not found in Figma (would fail to update): ${missingInFigma.slice(0, 10).join(', ')}${missingInFigma.length > 10 ? ', …' : ''}`,
    )
  }
  if (missingInTokens.length > 0) {
    console.log(
      `  ${missingInTokens.length} Figma variable(s) with no matching token (orphaned or not yet round-tripped).`,
    )
  }
}

/**
 * @returns {{
 *   newIds: { path: string[], variableId: string }[],
 *   removedIds: string[],
 * }}
 */
async function writePull({ baseTokens, brandNames, brandTokensByName }, figmaToken, figmaFileKey) {
  const localVariables = await getLocalVariables(figmaFileKey, figmaToken)

  let collectionId, modeIdByBrand
  if (Object.keys(localVariables.variableCollections).length === 0) {
    console.log('No Figma variable collection found in this file — bootstrapping one with a mode per brand…')
    const bootstrap = buildBootstrapPayload(brandNames, process.env.FIGMA_COLLECTION_NAME)
    const bootstrapResult = await postVariables(figmaFileKey, figmaToken, {
      variableCollections: bootstrap.variableCollections,
      variableModes: bootstrap.variableModes,
    })
    ;({ collectionId, modeIdByBrand } = resolveBootstrapIds(bootstrap, bootstrapResult.tempIdToRealId ?? {}))
    console.log(
      `Bootstrapped collection ${collectionId} with modes: ${Object.entries(modeIdByBrand)
        .map(([b, id]) => `${b}=${id}`)
        .join(', ')}`,
    )
  } else {
    ;({ collectionId, modeIdByBrand } = findCollectionAndModes(localVariables, brandNames))
  }

  // Path/name fallback match (docs/adr/0001-figma-variable-identity-key.md)
  // — a token with no committed variableId might already exist in Figma
  // under this exact name (e.g. an earlier partial run got interrupted
  // after creating it but before its id was backfilled to GitHub). Linking
  // to it avoids a duplicate-name 400 from Figma and the duplicate
  // variable it would otherwise create.
  const nameIndex = buildNameIndex(localVariables, collectionId)
  const idByPath = assignVariableIds(baseTokens, nameIndex)

  // Deletions (docs/adr/0019-pull-auto-deletes-figma-variables.md) are
  // baseline-relative — only a variableId this Action previously synced
  // and that's now gone from the tree is safe to delete; a Figma variable
  // with no matching token that was *never* in the baseline is left alone
  // (it's the plugin's Push flow's job to pick that up, not this Action's
  // to delete). Merged into pass 1: deletions don't depend on temp-id
  // resolution, so there's no ordering reason to keep them in a separate call.
  const existingState = loadSyncStateFile(SYNC_STATE_FILE)
  const removedIds = findRemovedVariableIds(existingState, baseTokens)
  if (removedIds.length > 0) {
    console.log(`Deleting ${removedIds.length} Figma variable(s) whose token was removed from GitHub…`)
  }

  const createPass = buildCreatePassPayload({ baseTokens, brandTokensByName, idByPath, collectionId, modeIdByBrand })
  const deletePass = buildDeleteVariablesPayload(removedIds)
  createPass.variables.push(...deletePass.variables)

  console.log(
    `Pass 1: creating ${createPass.variables.length - deletePass.variables.length} variable(s), deleting ${deletePass.variables.length}, writing ${createPass.variableModeValues.length} literal mode-value(s)…`,
  )
  const createResult = await postVariables(figmaFileKey, figmaToken, createPass)
  resolveTempIds(idByPath, createResult.tempIdToRealId ?? {})

  const aliasPass = buildAliasPassPayload({ baseTokens, brandTokensByName, idByPath, modeIdByBrand })
  console.log(`Pass 2: writing ${aliasPass.variableModeValues.length} alias mode-value(s)…`)
  if (aliasPass.variableModeValues.length > 0) {
    await postVariables(figmaFileKey, figmaToken, aliasPass)
  }

  const newIds = collectNewlyCreatedIds(baseTokens, idByPath)
  console.log(`Done — ${newIds.length} token(s) got a new variableId this run.`)
  return { newIds, removedIds }
}

async function main() {
  const resolved = resolveBrandTrees()
  const figmaToken = process.env.FIGMA_API_TOKEN
  const figmaFileKey = process.env.FIGMA_FILE_KEY
  const dryRunMode = process.env.DRY_RUN !== 'false'

  if (dryRunMode) {
    await dryRun(resolved, figmaToken, figmaFileKey)
    return
  }

  if (!figmaToken || !figmaFileKey) {
    throw new Error('DRY_RUN=false requires FIGMA_API_TOKEN and FIGMA_FILE_KEY to be set.')
  }

  const { newIds, removedIds } = await writePull(resolved, figmaToken, figmaFileKey)
  if (process.env.GITHUB_OUTPUT) {
    // docs/adr/0017-direct-commit-variableid-backfill.md's write-back step
    // reads these. `::set-output::` is deprecated/removed — GITHUB_OUTPUT
    // is the current mechanism. Paths/ids never contain newlines, so a
    // single-line JSON string is safe without the multiline delimiter syntax.
    if (newIds.length > 0) appendFileSync(process.env.GITHUB_OUTPUT, `new_ids=${JSON.stringify(newIds)}\n`)
    if (removedIds.length > 0) appendFileSync(process.env.GITHUB_OUTPUT, `removed_ids=${JSON.stringify(removedIds)}\n`)
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
