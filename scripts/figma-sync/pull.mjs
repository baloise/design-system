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
import { appendFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSyncStateFile } from './lib/baseline.mjs'
import {
  buildBootstrapPayload,
  buildResponsiveBootstrapPayload,
  resolveBootstrapIds,
  resolveResponsiveBootstrapIds,
} from './lib/bootstrap.mjs'
import { buildDeleteVariablesPayload, findRemovedVariableIds } from './lib/deletion.mjs'
import {
  buildNameIndex,
  findCollectionAndModes,
  findResponsiveCollectionAndModes,
  getLocalVariables,
  postVariables,
} from './lib/figma.mjs'
import { brandFilePath, flattenTokens, listBrandNames, loadTokenFile, mergeBrandTree } from './lib/tokens.mjs'
import {
  assignVariableIds,
  buildAliasPassPayload,
  buildCreatePassPayload,
  buildDescriptionUpdatePayload,
  collectNewlyCreatedIds,
  committedVariableIds,
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
 * Resolves the brand collection ("Design Tokens"), bootstrapping it if this file has never had one
 * under that name — same one-time bootstrap the responsive collection below gets, independently,
 * since a file might already have one collection but not the other (e.g. this feature shipped after
 * the brand collection was already bootstrapped).
 */
async function resolveBrandCollection(localVariables, brandNames, figmaFileKey, figmaToken) {
  const collectionName = process.env.FIGMA_COLLECTION_NAME ?? 'Design Tokens'
  const exists = Object.values(localVariables.variableCollections).some(c => c.name === collectionName)
  if (!exists) {
    console.log(
      `No Figma variable collection named "${collectionName}" found — bootstrapping one with a mode per brand…`,
    )
    const bootstrap = buildBootstrapPayload(brandNames, collectionName)
    const bootstrapResult = await postVariables(figmaFileKey, figmaToken, {
      variableCollections: bootstrap.variableCollections,
      variableModes: bootstrap.variableModes,
    })
    const resolved = resolveBootstrapIds(bootstrap, bootstrapResult.tempIdToRealId ?? {})
    console.log(
      `Bootstrapped collection ${resolved.collectionId} with modes: ${Object.entries(resolved.modeIdByBrand)
        .map(([b, id]) => `${b}=${id}`)
        .join(', ')}`,
    )
    return resolved
  }
  return findCollectionAndModes(localVariables, brandNames, collectionName)
}

/**
 * Resolves the responsive collection ("Design Responsive Tokens" — MVP scope, Device variables for
 * Device-layer Text.Size/Space/Container.Space only, see lib/figma-value.mjs's DEVICE_ELIGIBLE_PATH_PREFIXES),
 * bootstrapping it if this file has never had one under that name.
 */
async function resolveResponsiveCollection(localVariables, figmaFileKey, figmaToken) {
  const collectionName = process.env.FIGMA_RESPONSIVE_COLLECTION_NAME ?? 'Design Responsive Tokens'
  const exists = Object.values(localVariables.variableCollections).some(c => c.name === collectionName)
  if (!exists) {
    console.log(
      `No Figma variable collection named "${collectionName}" found — bootstrapping one with Mobile/Tablet/Desktop modes…`,
    )
    const bootstrap = buildResponsiveBootstrapPayload(collectionName)
    const bootstrapResult = await postVariables(figmaFileKey, figmaToken, {
      variableCollections: bootstrap.variableCollections,
      variableModes: bootstrap.variableModes,
    })
    const resolved = resolveResponsiveBootstrapIds(bootstrap, bootstrapResult.tempIdToRealId ?? {})
    console.log(
      `Bootstrapped responsive collection ${resolved.collectionId} with modes: ${Object.entries(
        resolved.modeIdByBreakpoint,
      )
        .map(([b, id]) => `${b}=${id}`)
        .join(', ')}`,
    )
    return resolved
  }
  return findResponsiveCollectionAndModes(localVariables, collectionName)
}

/**
 * @returns {{
 *   newIds: { path: string[], variableId: string }[],
 *   removedIds: string[],
 * }}
 */
async function writePull({ baseTokens, brandNames, brandTokensByName }, figmaToken, figmaFileKey) {
  const localVariables = await getLocalVariables(figmaFileKey, figmaToken)

  // Fail fast, before any POST, if the tokens tree already carries variableIds this file has never
  // seen — almost always TOKENS_DIR_OVERRIDE was meant to be set (testing against a sandbox file
  // with the production tokens directory). Left undetected, this surfaces later as a cryptic 400
  // from Figma's alias pass, after the create pass has already written.
  const unknownIds = committedVariableIds(baseTokens).filter(id => !localVariables.variables[id])
  if (unknownIds.length > 0) {
    throw new Error(
      `${unknownIds.length} committed variableId(s) don't exist in file ${figmaFileKey} (e.g. ${unknownIds
        .slice(0, 5)
        .join(', ')}). This usually means the tokens directory was round-tripped against a ` +
        `different Figma file — set TOKENS_DIR_OVERRIDE to a scratch tokens directory for sandbox-` +
        `file testing, or point FIGMA_FILE_KEY at the file these variableIds actually belong to.`,
    )
  }

  const { collectionId, modeIdByBrand } = await resolveBrandCollection(
    localVariables,
    brandNames,
    figmaFileKey,
    figmaToken,
  )
  const { collectionId: responsiveCollectionId, modeIdByBreakpoint } = await resolveResponsiveCollection(
    localVariables,
    figmaFileKey,
    figmaToken,
  )

  // Path/name fallback match (docs/adr/0001-figma-variable-identity-key.md)
  // — a token with no committed variableId might already exist in Figma
  // under this exact name (e.g. an earlier partial run got interrupted
  // after creating it but before its id was backfilled to GitHub). Linking
  // to it avoids a duplicate-name 400 from Figma and the duplicate
  // variable it would otherwise create. Scoped per collection — a Device
  // variable's name-fallback match only makes sense against the responsive
  // collection's own variables, not the brand collection's.
  const nameIndex = buildNameIndex(localVariables, collectionId)
  const responsiveNameIndex = buildNameIndex(localVariables, responsiveCollectionId)
  const idByPath = assignVariableIds(baseTokens, nameIndex, responsiveNameIndex)

  // Deletions (docs/adr/0019-pull-auto-deletes-figma-variables.md) are
  // baseline-relative — only a variableId this Action previously synced
  // and that's now gone from the tree is safe to delete; a Figma variable
  // with no matching token that was *never* in the baseline is left alone
  // (it's the plugin's Push flow's job to pick that up, not this Action's
  // to delete). Merged into pass 1: deletions don't depend on temp-id
  // resolution, so there's no ordering reason to keep them in a separate call.
  // Baseline-relative (findRemovedVariableIds only ever compares against the
  // last-synced state, never Figma's live state), so a stale baseline entry
  // whose variable Figma no longer has (deleted out of band, or the
  // collection it lived in got recreated/renamed) is still "removed" here —
  // it still needs to drop out of the baseline below — but must not be
  // queued as a DELETE: Figma's POST /variables is atomic, and a DELETE
  // against a nonexistent id 400s the *entire* batch, taking this run's
  // creates and mode-values down with it.
  const existingState = loadSyncStateFile(SYNC_STATE_FILE)
  const removedIds = findRemovedVariableIds(existingState, baseTokens)
  const deletableIds = removedIds.filter(id => localVariables.variables[id])
  const staleBaselineIds = removedIds.filter(id => !localVariables.variables[id])
  if (deletableIds.length > 0) {
    console.log(`Deleting ${deletableIds.length} Figma variable(s) whose token was removed from GitHub…`)
  }
  if (staleBaselineIds.length > 0) {
    console.log(
      `Dropping ${staleBaselineIds.length} stale baseline entr${staleBaselineIds.length === 1 ? 'y' : 'ies'} whose variable no longer exists in Figma (e.g. ${staleBaselineIds.slice(0, 5).join(', ')}).`,
    )
  }

  const createPass = buildCreatePassPayload({
    baseTokens,
    brandTokensByName,
    idByPath,
    collectionId,
    modeIdByBrand,
    responsiveCollectionId,
  })
  const deletePass = buildDeleteVariablesPayload(deletableIds)
  createPass.variables.push(...deletePass.variables)

  console.log(
    `Pass 1: creating ${createPass.variables.length - deletePass.variables.length} variable(s), deleting ${deletePass.variables.length}, writing ${createPass.variableModeValues.length} literal mode-value(s)…`,
  )
  const createResult = await postVariables(figmaFileKey, figmaToken, createPass)
  resolveTempIds(idByPath, createResult.tempIdToRealId ?? {})

  const aliasPass = buildAliasPassPayload({
    baseTokens,
    brandTokensByName,
    idByPath,
    modeIdByBrand,
    modeIdByBreakpoint,
  })
  console.log(`Pass 2: writing ${aliasPass.variableModeValues.length} alias mode-value(s)…`)
  if (aliasPass.variableModeValues.length > 0) {
    await postVariables(figmaFileKey, figmaToken, aliasPass)
  }

  const descriptionPass = buildDescriptionUpdatePayload({
    baseTokens,
    idByPath,
    remoteVariablesById: localVariables.variables,
  })
  console.log(`Pass 3: updating ${descriptionPass.variables.length} variable description(s)…`)
  if (descriptionPass.variables.length > 0) {
    await postVariables(figmaFileKey, figmaToken, descriptionPass)
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
    // docs/adr/0017-direct-commit-variableid-backfill.md's write-back step reads these. The JSON
    // payload itself goes to a file, not the output directly — a full-tree first sync can produce
    // thousands of entries, and passing that much JSON through as a step output turns into an
    // environment variable for the next step; GitHub Actions/the OS both cap how much an env var
    // (and total env) can hold, and this blows past it ("Argument list too long" spawning the next
    // step's shell). A file path is always short enough to pass safely.
    const outDir = process.env.RUNNER_TEMP ?? tmpdir()
    if (newIds.length > 0) {
      const newIdsFile = resolve(outDir, 'figma-sync-new-ids.json')
      writeFileSync(newIdsFile, JSON.stringify(newIds))
      appendFileSync(process.env.GITHUB_OUTPUT, `new_ids_file=${newIdsFile}\n`)
    }
    if (removedIds.length > 0) {
      const removedIdsFile = resolve(outDir, 'figma-sync-removed-ids.json')
      writeFileSync(removedIdsFile, JSON.stringify(removedIds))
      appendFileSync(process.env.GITHUB_OUTPUT, `removed_ids_file=${removedIdsFile}\n`)
    }
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
