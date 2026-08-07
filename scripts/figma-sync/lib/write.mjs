/**
 * Builds the payloads for Figma's `POST /v1/files/:key/variables`, as a
 * two-pass write (docs/plans/figma-sync-action-plan.md §2 "Reference
 * handling"): pass 1 creates every not-yet-synced variable and writes
 * every literal mode-value; pass 2 writes alias mode-values, once pass 1's
 * response has resolved every temp id to a real one. Pure/testable — no
 * network calls live here, only in lib/figma.mjs.
 */
import { buildTokenIndex, pathKey, resolveAliasTarget } from './alias.mjs'
import { figmaValueFor, resolvedTypeFor } from './figma-value.mjs'

export function figmaVariableName(path) {
  return path.join('/')
}

/**
 * Assigns every Base token the id its Figma payload entries should use:
 * its existing `variableId`, or a fresh temp id for a token that's never
 * been synced. Computed once against Base — a brand override reuses
 * Base's variableId, it never mints its own
 * (docs/adr/0012-brand-modes-not-collections.md) — and reused for every
 * brand's mode-values.
 */
export function assignVariableIds(baseTokens) {
  const idByPath = new Map()
  for (const token of baseTokens) {
    const key = pathKey(token.path)
    idByPath.set(key, token.variableId ?? `temp-${key}`)
  }
  return idByPath
}

/**
 * @param {object} params
 * @param {import('./tokens.mjs').Token[]} params.baseTokens
 * @param {Record<string, import('./tokens.mjs').Token[]>} params.brandTokensByName e.g. { Base: [...], Tcs: [...] }
 * @param {Map<string, string>} params.idByPath from assignVariableIds
 * @param {string} params.collectionId
 * @param {Record<string, string>} params.modeIdByBrand
 */
export function buildCreatePassPayload({ baseTokens, brandTokensByName, idByPath, collectionId, modeIdByBrand }) {
  const variables = []
  const seenVariableIds = new Set()

  for (const token of baseTokens) {
    if (token.variableId) continue // already exists in Figma — nothing to CREATE

    const key = pathKey(token.path)
    const variableId = idByPath.get(key)
    if (seenVariableIds.has(variableId)) continue
    seenVariableIds.add(variableId)

    variables.push({
      action: 'CREATE',
      id: variableId,
      name: figmaVariableName(token.path),
      variableCollectionId: collectionId,
      resolvedType: resolvedTypeFor(token.type),
      scopes: token.figmaScopes ?? ['ALL_SCOPES'],
    })
  }

  const variableModeValues = []
  for (const [brandName, tokens] of Object.entries(brandTokensByName)) {
    const modeId = modeIdByBrand[brandName]
    for (const token of tokens) {
      if (token.value.kind === 'reference') continue // pass 2

      variableModeValues.push({
        variableId: idByPath.get(pathKey(token.path)),
        modeId,
        value: figmaValueFor(token.type, token.value.value),
      })
    }
  }

  return { variables, variableModeValues }
}

/**
 * Pass 2: alias mode-values only. Call after `resolveTempIds` has patched
 * `idByPath` with pass 1's real ids — every variable this run touches
 * (existing or freshly created) has a real id by the time this runs.
 */
export function buildAliasPassPayload({ baseTokens, brandTokensByName, idByPath, modeIdByBrand }) {
  const tokenIndex = buildTokenIndex(baseTokens)
  const variableModeValues = []

  for (const [brandName, tokens] of Object.entries(brandTokensByName)) {
    const modeId = modeIdByBrand[brandName]
    for (const token of tokens) {
      if (token.value.kind !== 'reference') continue

      const target = resolveAliasTarget(token, tokenIndex)
      variableModeValues.push({
        variableId: idByPath.get(pathKey(token.path)),
        modeId,
        value: { type: 'VARIABLE_ALIAS', id: idByPath.get(pathKey(target.path)) },
      })
    }
  }

  return { variableModeValues }
}

/**
 * Patches `idByPath` in place so every temp id assigned by
 * `assignVariableIds` is replaced with pass 1's real Figma id — pass 2 and
 * the newly-created-id collection below must never see a temp id again.
 */
export function resolveTempIds(idByPath, tempIdToRealId) {
  for (const [key, id] of idByPath) {
    if (id in tempIdToRealId) idByPath.set(key, tempIdToRealId[id])
  }
}

/**
 * Tokens that had no `variableId` at the start of this run — what
 * docs/adr/0017-direct-commit-variableid-backfill.md's write-back commit
 * needs. Call only after `resolveTempIds`, so every entry already holds a
 * real Figma id, never a temp one.
 */
export function collectNewlyCreatedIds(baseTokens, idByPath) {
  return baseTokens.filter(token => !token.variableId).map(token => ({ path: token.path, variableId: idByPath.get(pathKey(token.path)) }))
}
