/**
 * Builds the payloads for Figma's `POST /v1/files/:key/variables`, as a
 * two-pass write (docs/plans/figma-sync-action-plan.md §2 "Reference
 * handling"): pass 1 creates every not-yet-synced variable and writes
 * every literal mode-value; pass 2 writes alias mode-values, once pass 1's
 * response has resolved every temp id to a real one. Pure/testable — no
 * network calls live here, only in lib/figma.mjs.
 */
import { buildTokenIndex, pathKey, resolveAliasTarget } from './alias.mjs'
import {
  BORDER_SUB_PROPERTIES,
  BORDER_SUB_PROPERTY_RESOLVED_TYPE,
  BORDER_SUB_PROPERTY_SUFFIX,
  figmaBorderSubValuesFor,
  figmaResponsiveDimensionSubValuesFor,
  figmaShadowSubValuesFor,
  figmaTypographySubValuesFor,
  figmaValueFor,
  isPushableToken,
  isSyncableBorderToken,
  isSyncableResponsiveDimensionToken,
  isSyncableShadowToken,
  isSyncableTypographyToken,
  resolvedTypeFor,
  RESPONSIVE_DIMENSION_SUB_PROPERTIES,
  RESPONSIVE_DIMENSION_SUB_PROPERTY_RESOLVED_TYPE,
  RESPONSIVE_DIMENSION_SUB_PROPERTY_SUFFIX,
  SHADOW_SUB_PROPERTIES,
  SHADOW_SUB_PROPERTY_RESOLVED_TYPE,
  SHADOW_SUB_PROPERTY_SUFFIX,
  subPropertiesForVariableIdShape,
  TYPOGRAPHY_SUB_PROPERTIES,
  TYPOGRAPHY_SUB_PROPERTY_RESOLVED_TYPE,
  TYPOGRAPHY_SUB_PROPERTY_SUFFIX,
} from './figma-value.mjs'

export function figmaVariableName(path) {
  return path.join('/')
}

export function figmaShadowSubVariableName(path, subProperty) {
  return `${figmaVariableName(path)}/${SHADOW_SUB_PROPERTY_SUFFIX[subProperty]}`
}

export function figmaBorderSubVariableName(path, subProperty) {
  return `${figmaVariableName(path)}/${BORDER_SUB_PROPERTY_SUFFIX[subProperty]}`
}

export function figmaTypographySubVariableName(path, subProperty) {
  return `${figmaVariableName(path)}/${TYPOGRAPHY_SUB_PROPERTY_SUFFIX[subProperty]}`
}

export function figmaResponsiveDimensionSubVariableName(path, subProperty) {
  return `${figmaVariableName(path)}/${RESPONSIVE_DIMENSION_SUB_PROPERTY_SUFFIX[subProperty]}`
}

// A shadow, border, or typography token's Figma identity is several variableIds, not 1 —
// $extensions.com.figma.variableId is an object ({offsetX, offsetY, blur, spread, color} for
// shadow; {color, width, style} for border; {fontFamily, fontSize, fontWeight, lineHeight} for
// typography) instead of the single string every other type uses.
function isCompositeVariableIdSet(id) {
  return typeof id === 'object' && id !== null
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
    if (!isPushableToken(token)) continue
    const key = pathKey(token.path)

    if (isSyncableShadowToken(token)) {
      if (isCompositeVariableIdSet(token.variableId)) {
        idByPath.set(key, token.variableId)
        continue
      }
      // Path/name fallback match, per sub-property — only used if every one
      // of the 5 sub-variables already exists under its expected name
      // (e.g. an earlier partial run got interrupted after creating some of
      // them); otherwise every sub-property gets a fresh temp id, rather
      // than mixing real and temp ids within one shadow token's identity.
      const bySubProperty = Object.fromEntries(
        SHADOW_SUB_PROPERTIES.map(sub => [sub, existingNameIndex.get(figmaShadowSubVariableName(token.path, sub))]),
      )
      const allFound = SHADOW_SUB_PROPERTIES.every(sub => bySubProperty[sub])
      idByPath.set(
        key,
        allFound ? bySubProperty : Object.fromEntries(SHADOW_SUB_PROPERTIES.map(sub => [sub, `temp-${key}-${sub}`])),
      )
      continue
    }

    if (isSyncableBorderToken(token)) {
      if (isCompositeVariableIdSet(token.variableId)) {
        idByPath.set(key, token.variableId)
        continue
      }
      // Path/name fallback match, per sub-property — same "all-or-nothing" reasoning as shadow's.
      const bySubProperty = Object.fromEntries(
        BORDER_SUB_PROPERTIES.map(sub => [sub, existingNameIndex.get(figmaBorderSubVariableName(token.path, sub))]),
      )
      const allFound = BORDER_SUB_PROPERTIES.every(sub => bySubProperty[sub])
      idByPath.set(
        key,
        allFound ? bySubProperty : Object.fromEntries(BORDER_SUB_PROPERTIES.map(sub => [sub, `temp-${key}-${sub}`])),
      )
      continue
    }

    if (isSyncableTypographyToken(token)) {
      if (isCompositeVariableIdSet(token.variableId)) {
        idByPath.set(key, token.variableId)
        continue
      }
      // Path/name fallback match, per sub-property — same "all-or-nothing" reasoning as shadow's.
      const bySubProperty = Object.fromEntries(
        TYPOGRAPHY_SUB_PROPERTIES.map(sub => [
          sub,
          existingNameIndex.get(figmaTypographySubVariableName(token.path, sub)),
        ]),
      )
      const allFound = TYPOGRAPHY_SUB_PROPERTIES.every(sub => bySubProperty[sub])
      idByPath.set(
        key,
        allFound
          ? bySubProperty
          : Object.fromEntries(TYPOGRAPHY_SUB_PROPERTIES.map(sub => [sub, `temp-${key}-${sub}`])),
      )
      continue
    }

    if (isSyncableResponsiveDimensionToken(token)) {
      if (isCompositeVariableIdSet(token.variableId)) {
        idByPath.set(key, token.variableId)
        continue
      }
      // Path/name fallback match, per sub-property — same "all-or-nothing" reasoning as shadow's.
      const bySubProperty = Object.fromEntries(
        RESPONSIVE_DIMENSION_SUB_PROPERTIES.map(sub => [
          sub,
          existingNameIndex.get(figmaResponsiveDimensionSubVariableName(token.path, sub)),
        ]),
      )
      const allFound = RESPONSIVE_DIMENSION_SUB_PROPERTIES.every(sub => bySubProperty[sub])
      idByPath.set(
        key,
        allFound
          ? bySubProperty
          : Object.fromEntries(RESPONSIVE_DIMENSION_SUB_PROPERTIES.map(sub => [sub, `temp-${key}-${sub}`])),
      )
      continue
    }

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
 * @param {Map<string, string | Record<string, string>>} params.idByPath from assignVariableIds
 * @param {string} params.collectionId
 * @param {Record<string, string>} params.modeIdByBrand
 */
export function buildCreatePassPayload({ baseTokens, brandTokensByName, idByPath, collectionId, modeIdByBrand }) {
  const variables = []
  const seenVariableIds = new Set()

  for (const token of baseTokens) {
    if (!isPushableToken(token)) continue
    const key = pathKey(token.path)
    const variableId = idByPath.get(key)

    if (isSyncableShadowToken(token)) {
      for (const sub of SHADOW_SUB_PROPERTIES) {
        const subId = variableId[sub]
        if (!isTempId(subId) || seenVariableIds.has(subId)) continue
        seenVariableIds.add(subId)
        variables.push({
          action: 'CREATE',
          id: subId,
          name: figmaShadowSubVariableName(token.path, sub),
          variableCollectionId: collectionId,
          resolvedType: SHADOW_SUB_PROPERTY_RESOLVED_TYPE[sub],
          scopes: token.figmaScopes ?? ['ALL_SCOPES'],
        })
      }
      continue
    }

    if (isSyncableBorderToken(token)) {
      for (const sub of BORDER_SUB_PROPERTIES) {
        const subId = variableId[sub]
        if (!isTempId(subId) || seenVariableIds.has(subId)) continue
        seenVariableIds.add(subId)
        variables.push({
          action: 'CREATE',
          id: subId,
          name: figmaBorderSubVariableName(token.path, sub),
          variableCollectionId: collectionId,
          resolvedType: BORDER_SUB_PROPERTY_RESOLVED_TYPE[sub],
          scopes: token.figmaScopes ?? ['ALL_SCOPES'],
        })
      }
      continue
    }

    if (isSyncableTypographyToken(token)) {
      for (const sub of TYPOGRAPHY_SUB_PROPERTIES) {
        const subId = variableId[sub]
        if (!isTempId(subId) || seenVariableIds.has(subId)) continue
        seenVariableIds.add(subId)
        variables.push({
          action: 'CREATE',
          id: subId,
          name: figmaTypographySubVariableName(token.path, sub),
          variableCollectionId: collectionId,
          resolvedType: TYPOGRAPHY_SUB_PROPERTY_RESOLVED_TYPE[sub],
          scopes: token.figmaScopes ?? ['ALL_SCOPES'],
        })
      }
      continue
    }

    if (isSyncableResponsiveDimensionToken(token)) {
      for (const sub of RESPONSIVE_DIMENSION_SUB_PROPERTIES) {
        const subId = variableId[sub]
        if (!isTempId(subId) || seenVariableIds.has(subId)) continue
        seenVariableIds.add(subId)
        variables.push({
          action: 'CREATE',
          id: subId,
          name: figmaResponsiveDimensionSubVariableName(token.path, sub),
          variableCollectionId: collectionId,
          resolvedType: RESPONSIVE_DIMENSION_SUB_PROPERTY_RESOLVED_TYPE[sub],
          scopes: token.figmaScopes ?? ['ALL_SCOPES'],
        })
      }
      continue
    }

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

  // Border/typography sub-values may be references (docs/plans/border-token-type-plan.md
  // decision 4, docs/plans/typography-token-type-plan.md decision 4), so
  // figmaBorderSubValuesFor/figmaTypographySubValuesFor need the full Base token index to follow
  // them to a literal — unlike shadow's, whose sub-values are always inline literals.
  const tokenIndex = buildTokenIndex(baseTokens)

  const variableModeValues = []
  for (const [brandName, tokens] of Object.entries(brandTokensByName)) {
    const modeId = modeIdByBrand[brandName]
    for (const token of tokens) {
      if (!isPushableToken(token)) continue
      if (token.value.kind === 'reference') continue // pass 2

      if (isSyncableShadowToken(token)) {
        const variableId = idByPath.get(pathKey(token.path))
        const subValues = figmaShadowSubValuesFor(token.value.value)
        for (const sub of SHADOW_SUB_PROPERTIES) {
          variableModeValues.push({ variableId: variableId[sub], modeId, value: subValues[sub] })
        }
        continue
      }

      if (isSyncableBorderToken(token)) {
        const variableId = idByPath.get(pathKey(token.path))
        const subValues = figmaBorderSubValuesFor(token.value.value, tokenIndex)
        for (const sub of BORDER_SUB_PROPERTIES) {
          variableModeValues.push({ variableId: variableId[sub], modeId, value: subValues[sub] })
        }
        continue
      }

      if (isSyncableTypographyToken(token)) {
        const variableId = idByPath.get(pathKey(token.path))
        const subValues = figmaTypographySubValuesFor(token.value.value, tokenIndex)
        for (const sub of TYPOGRAPHY_SUB_PROPERTIES) {
          variableModeValues.push({ variableId: variableId[sub], modeId, value: subValues[sub] })
        }
        continue
      }

      if (isSyncableResponsiveDimensionToken(token)) {
        const variableId = idByPath.get(pathKey(token.path))
        const subValues = figmaResponsiveDimensionSubValuesFor(token.responsive, tokenIndex)
        for (const sub of RESPONSIVE_DIMENSION_SUB_PROPERTIES) {
          variableModeValues.push({ variableId: variableId[sub], modeId, value: subValues[sub] })
        }
        continue
      }

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
      if (!isPushableToken(token)) continue
      if (token.value.kind !== 'reference') continue

      const target = resolveAliasTarget(token, tokenIndex)

      if (isSyncableShadowToken(token)) {
        // The target must itself be a syncable (single-layer) shadow token
        // — if it isn't, it has no idByPath entry to alias against, so this
        // reference is left unsynced too, same "not eligible" policy as the
        // literal case.
        if (!isPushableToken(target)) continue
        const variableId = idByPath.get(pathKey(token.path))
        const targetVariableId = idByPath.get(pathKey(target.path))
        for (const sub of SHADOW_SUB_PROPERTIES) {
          variableModeValues.push({
            variableId: variableId[sub],
            modeId,
            value: { type: 'VARIABLE_ALIAS', id: targetVariableId[sub] },
          })
        }
        continue
      }

      if (isSyncableBorderToken(token)) {
        // Same "target must itself be syncable" policy as shadow's — border has no unsyncable
        // shape today, but a future brand-level exception should fail the same safe way.
        if (!isPushableToken(target)) continue
        const variableId = idByPath.get(pathKey(token.path))
        const targetVariableId = idByPath.get(pathKey(target.path))
        for (const sub of BORDER_SUB_PROPERTIES) {
          variableModeValues.push({
            variableId: variableId[sub],
            modeId,
            value: { type: 'VARIABLE_ALIAS', id: targetVariableId[sub] },
          })
        }
        continue
      }

      if (isSyncableTypographyToken(token)) {
        // Same "target must itself be syncable" policy as shadow's/border's.
        if (!isPushableToken(target)) continue
        const variableId = idByPath.get(pathKey(token.path))
        const targetVariableId = idByPath.get(pathKey(target.path))
        for (const sub of TYPOGRAPHY_SUB_PROPERTIES) {
          variableModeValues.push({
            variableId: variableId[sub],
            modeId,
            value: { type: 'VARIABLE_ALIAS', id: targetVariableId[sub] },
          })
        }
        continue
      }

      // No isSyncableResponsiveDimensionToken branch here: unlike shadow/border/typography, a
      // responsive dimension token's own $value is never itself a `{reference}` (decision 4 keeps
      // it a literal mirroring mobile; decision 2's mutual exclusivity means a token is never both
      // referenceTarget-set and responsive at once) — so `token.value.kind === 'reference'` is
      // never true for one, and this loop (filtered to that above) never reaches one as `token`.
      // It *can* reach one as `target`, though — a plain dimension token can reference a
      // responsive one by path — which idByPath resolves to a {mobile, tablet, desktop} object,
      // not a single id. There's no single Figma variable that alias could point at (which
      // breakpoint would it mean?), so it's skipped, same "not eligible" policy as an unsyncable
      // shadow/border/typography target.
      const targetVariableId = idByPath.get(pathKey(target.path))
      if (isCompositeVariableIdSet(targetVariableId)) continue

      variableModeValues.push({
        variableId: idByPath.get(pathKey(token.path)),
        modeId,
        value: { type: 'VARIABLE_ALIAS', id: targetVariableId },
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
    if (isCompositeVariableIdSet(id)) {
      const subProperties = subPropertiesForVariableIdShape(id)
      const resolved = Object.fromEntries(
        subProperties.map(sub => [sub, id[sub] in tempIdToRealId ? tempIdToRealId[id[sub]] : id[sub]]),
      )
      idByPath.set(key, resolved)
      continue
    }
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
    .filter(token => isPushableToken(token) && !token.variableId)
    .map(token => ({ path: token.path, variableId: idByPath.get(pathKey(token.path)) }))
}
