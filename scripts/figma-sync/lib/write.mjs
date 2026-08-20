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
 * its existing `variableId`; failing that, a Figma variable already
 * carrying the same computed name (docs/adr/0001-figma-variable-identity-key.md's
 * documented path/name *fallback* match, for a token that's never
 * round-tripped an id — e.g. it was already created in Figma under this
 * exact name by an earlier partial run); failing that, a fresh temp id.
 * Computed once against Base — a brand override reuses Base's variableId,
 * it never mints its own (docs/adr/0012-brand-modes-not-collections.md) —
 * and reused for every brand's mode-values.
 *
 * @param {import('./tokens.mjs').Token[]} baseTokens
 * @param {Map<string, string>} existingNameIndex Figma variable name -> real id, scoped to the target collection
 */
export function assignVariableIds(baseTokens, existingNameIndex = new Map()) {
  const idByPath = new Map()
  for (const token of baseTokens) {
    const key = pathKey(token.path)
    const fallbackId = existingNameIndex.get(figmaVariableName(token.path))
    idByPath.set(key, token.variableId ?? fallbackId ?? `temp-${key}`)
  }
  return idByPath
}

function isTempId(id) {
  return id.startsWith('temp-')
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
    const key = pathKey(token.path)
    const variableId = idByPath.get(key)
    // Not a temp id — either the token already carried a variableId, or
    // assignVariableIds linked it to an existing Figma variable by name.
    // Either way, nothing to CREATE.
    if (!isTempId(variableId)) continue
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
  return baseTokens
    .filter(token => !token.variableId)
    .map(token => ({ path: token.path, variableId: idByPath.get(pathKey(token.path)) }))
}
