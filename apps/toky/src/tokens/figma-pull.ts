// Builds a Pull (from Figma) plan: matches Figma Variables against the
// current token tree and classifies each into create/update/delete/conflict/
// skipped — see docs/adr/0002-pull-from-figma-button.md. Pure and
// client-side; the API route (app/api/figma-pull/route.ts) only fetches the
// raw Figma meta this operates on.
//
// Brand overrides never carry their own $extensions.com.figma.variableId —
// scripts/figma-sync/lib/write.mjs's assignVariableIds comment confirms a
// brand override always reuses Base's variableId, never mints its own. So
// matching is always keyed off the Base tree; a brand's Figma mode-value is
// compared against its own sparse override (if any) or, absent one,
// against the resolved Base value it would otherwise inherit.
import type { WorkingToken } from './edit'
import { KEY_BY_LAYER } from './flatten'
import type { FigmaVariable, FigmaVariablesMeta } from './figma'
import {
  BORDER_SUB_PROPERTIES,
  borderStyleReferenceFromKeyword,
  dtcgColorFromFigma,
  dtcgResponsiveDimensionFromFigma,
  dtcgShadowLayerFromFigma,
  dtcgTypeFor,
  fontWeightNumberFromKeyword,
  isBorderFigmaId,
  isFigmaAlias,
  isLiteralValueEqual,
  isResponsiveDimensionFigmaId,
  isShadowFigmaId,
  isTypographyFigmaId,
  pathFromFigmaVariableName,
  RESPONSIVE_DIMENSION_SUB_PROPERTIES,
  SHADOW_SUB_PROPERTIES,
  TYPOGRAPHY_SUB_PROPERTIES,
} from './figma-map'
import type {
  BorderSubProperty,
  ResponsiveDimensionSubProperty,
  ShadowSubProperty,
  TypographySubProperty,
} from './figma-map'
import type { FigmaId, FlatToken, ResponsiveDimensionValue, TokenLayer } from './types'

// 1rem = 16px, this repo's fixed base font size (matches
// packages/tokens/src/config.base.ts's basePxFontSize and
// scripts/figma-sync/lib/figma-value.mjs's PX_PER_REM).
const PX_PER_REM = 16

export interface PulledEntry {
  kind: 'create' | 'update' | 'delete'
  layer: TokenLayer
  path: string[]
  // A shadow entry's figmaId is an object of 5 sub-ids, not 1 string — see
  // docs/plans/shadow-token-type-plan.md.
  figmaId: FigmaId
  type: string
  rawValue: unknown
  referenceTarget: string | null
  // A responsive dimension entry's reconstructed breakpoint map
  // (docs/plans/responsive-dimension-token-plan.md) — undefined for every other entry. `rawValue`
  // above still carries the mobile-mirrored $value (decision 4); this carries the full
  // $extensions.com.helvetia.responsive object alongside it.
  responsive?: ResponsiveDimensionValue
}

export interface PullConflict {
  tokenId: string
  path: string[]
  layer: TokenLayer
  figmaId: FigmaId
  // Display-only effective values for rendering the conflict.
  workingValue: unknown
  figmaValue: unknown
  // The resolvable Figma-side value — what "Use Figma value" writes back
  // into working changes if the user picks it.
  figma: { type: string; rawValue: unknown; referenceTarget: string | null }
}

export interface SkippedVariable {
  variableId: string
  name: string
  reason: string
}

export interface PullPlan {
  creates: PulledEntry[]
  updates: PulledEntry[]
  deletes: PulledEntry[]
  conflicts: PullConflict[]
  skipped: SkippedVariable[]
}

export interface FigmaPullResult {
  base: PullPlan
  brands: Record<string, PullPlan>
}

function emptyPlan(): PullPlan {
  return { creates: [], updates: [], deletes: [], conflicts: [], skipped: [] }
}

const LAYER_BY_KEY: Record<string, TokenLayer> = Object.fromEntries(
  Object.entries(KEY_BY_LAYER).map(([layer, key]) => [key, layer as TokenLayer]),
)

export function findCollectionAndModes(
  meta: FigmaVariablesMeta,
  brandNames: string[],
): { collectionId: string; modeIdByBrand: Record<string, string> } {
  const collections = Object.values(meta.variableCollections)
  if (collections.length !== 1) {
    throw new Error(`Expected exactly one Figma variable collection, found ${collections.length}.`)
  }
  const collection = collections[0]

  const modeIdByBrand: Record<string, string> = {}
  for (const brand of ['Base', ...brandNames]) {
    const mode = collection.modes.find(m => m.name === brand)
    if (!mode) {
      throw new Error(`No Figma mode named "${brand}" found in collection "${collection.name}".`)
    }
    modeIdByBrand[brand] = mode.modeId
  }

  return { collectionId: collection.id, modeIdByBrand }
}

interface DtcgSnapshot {
  type: string
  referenceTarget: string | null
  rawValue: unknown
}

function snapshotOf(token: FlatToken): DtcgSnapshot {
  return { type: token.type, referenceTarget: token.referenceTarget, rawValue: token.rawValue }
}

function snapshotEqual(a: DtcgSnapshot, b: DtcgSnapshot): boolean {
  if (a.type !== b.type) return false
  if (a.referenceTarget || b.referenceTarget) return a.referenceTarget === b.referenceTarget
  return isLiteralValueEqual(a.type, a.rawValue, b.rawValue)
}

function snapshotToEffectiveValue(snapshot: DtcgSnapshot): unknown {
  return snapshot.referenceTarget ? `{${snapshot.referenceTarget}}` : snapshot.rawValue
}

type DerivedValue =
  | { kind: 'literal'; type: string; rawValue: unknown }
  | { kind: 'alias'; type: string; referenceTarget: string }
  | { kind: 'unsupported'; reason: string }

// Turns one Figma variable's mode-value into a DTCG literal or an already-
// resolved alias (Figma variableId -> our token path), or flags it
// unsupported (unrecognized type, or an alias whose target isn't a token we
// know about — e.g. it points at a variable this same pull is also
// creating, a chicken-and-egg case deferred to the next pull).
//
// `referenceToken` is the locally-linked token this variable already
// matches (undefined for a brand-new/unmatched variable) — for a brand
// pull, that's the brand's own override if one exists, else the inherited
// Base token (see buildBrandPullPlan). STRING and FLOAT are both
// non-bijective — 'string'/'fontWeight'/'fontFamily' all project onto
// STRING, and 'number'/'dimension' both project onto FLOAT (figma-map.ts) —
// so for a *matched* variable, trusting the local token's own $type resolves
// the ambiguity instead of guessing from resolvedType, which would
// otherwise permanently disagree with the local token and show every such
// token as changed on every pull. `referenceToken`'s *value* additionally
// feeds fontFamily's merge and dimension's unit conversion (see below).
function deriveValue(
  variable: FigmaVariable,
  modeValue: unknown,
  baseIndex: Map<string, FlatToken>,
  referenceToken?: FlatToken,
): DerivedValue {
  let dtcgType: string
  try {
    dtcgType = dtcgTypeFor(variable.resolvedType)
  } catch {
    return { kind: 'unsupported', reason: `Unsupported Figma type "${variable.resolvedType}" — skipped.` }
  }

  const expectedType = referenceToken?.type
  if ((expectedType === 'fontWeight' || expectedType === 'fontFamily') && dtcgType === 'string') {
    dtcgType = expectedType
  }
  if (expectedType === 'dimension' && dtcgType === 'number') {
    dtcgType = expectedType
  }

  if (isFigmaAlias(modeValue)) {
    const target = baseIndex.get(modeValue.id)
    if (!target) {
      return { kind: 'unsupported', reason: 'Alias points at a variable with no known token — skipped.' }
    }
    return { kind: 'alias', type: dtcgType, referenceTarget: target.path.join('.') }
  }

  if (dtcgType === 'color') {
    return {
      kind: 'literal',
      type: dtcgType,
      rawValue: dtcgColorFromFigma(modeValue as { r: number; g: number; b: number; a: number }),
    }
  }

  if (dtcgType === 'fontWeight') {
    // Figma holds the keyword string (e.g. "Bold") — convert back to the
    // DTCG number so it compares/stores like the rest of a fontWeight token.
    const numeric = fontWeightNumberFromKeyword(modeValue)
    if (numeric === undefined) {
      return {
        kind: 'unsupported',
        reason: `Font-weight value "${String(modeValue)}" doesn't match a known DTCG keyword — skipped.`,
      }
    }
    return { kind: 'literal', type: dtcgType, rawValue: numeric }
  }

  if (dtcgType === 'fontFamily') {
    // Figma only ever holds the primary font as a single string — replace
    // just index 0 of the local array, preserving the rest of the fallback
    // stack (Arial, sans-serif, ...) that Figma has no way to see or set.
    const existing = Array.isArray(referenceToken?.rawValue) ? (referenceToken!.rawValue as unknown[]) : []
    return { kind: 'literal', type: dtcgType, rawValue: [modeValue, ...existing.slice(1)] }
  }

  if (dtcgType === 'dimension') {
    // Figma is always a raw px float — convert back using the matched
    // token's own unit (rem: /16, px: unchanged), so the pulled value
    // compares/stores like the rest of a dimension token.
    const referenceValue = referenceToken?.rawValue as { unit?: unknown } | undefined
    const unit = referenceValue?.unit
    const num = typeof modeValue === 'number' ? modeValue : NaN
    if (Number.isNaN(num) || (unit !== 'px' && unit !== 'rem')) {
      return {
        kind: 'unsupported',
        reason: `Dimension value "${String(modeValue)}" or its local unit is invalid — skipped.`,
      }
    }
    return { kind: 'literal', type: dtcgType, rawValue: { value: unit === 'rem' ? num / PX_PER_REM : num, unit } }
  }

  return { kind: 'literal', type: dtcgType, rawValue: modeValue }
}

function derivedSnapshot(derived: Extract<DerivedValue, { kind: 'literal' | 'alias' }>): DtcgSnapshot {
  return derived.kind === 'alias'
    ? { type: derived.type, referenceTarget: derived.referenceTarget, rawValue: undefined }
    : { type: derived.type, referenceTarget: null, rawValue: derived.rawValue }
}

function entryFrom(
  kind: PulledEntry['kind'],
  layer: TokenLayer,
  path: string[],
  figmaId: FigmaId,
  snapshot: DtcgSnapshot,
): PulledEntry {
  return {
    kind,
    layer,
    path,
    figmaId,
    type: snapshot.type,
    rawValue: snapshot.referenceTarget ? null : snapshot.rawValue,
    referenceTarget: snapshot.referenceTarget,
  }
}

// A shadow token's reconstructed value, from its 5 co-located Figma
// sub-variables — a literal DTCG shadow object, or (when all 5 sub-values
// are themselves VARIABLE_ALIASes to another shadow token's matching
// sub-properties) a reference to that token's path.
type ShadowDerivedValue =
  | { kind: 'literal'; rawValue: unknown }
  | { kind: 'alias'; referenceTarget: string }
  | { kind: 'unsupported'; reason: string }

// Reads all 5 of a shadow token's sub-variables (by its stored figmaId
// object) and reconstructs one DTCG shadow value from them — the shadow
// counterpart to deriveValue, but keyed by a 5-id set instead of 1 Figma
// variable, since Figma has no shadow-object variable type (see
// docs/plans/shadow-token-type-plan.md). `localUnit` supplies each
// dimension sub-value's current unit, read from the matched token's own
// literal value where one exists.
function deriveShadowValue(
  idSet: Record<ShadowSubProperty, string>,
  figmaMeta: FigmaVariablesMeta,
  modeId: string,
  shadowSubIndex: Map<string, { token: FlatToken; subProperty: ShadowSubProperty }>,
  localUnit: (sub: 'offsetX' | 'offsetY' | 'blur' | 'spread') => 'px' | 'rem',
): ShadowDerivedValue {
  const modeValues: Partial<Record<ShadowSubProperty, unknown>> = {}
  for (const sub of SHADOW_SUB_PROPERTIES) {
    const variable = figmaMeta.variables[idSet[sub]]
    const modeValue = variable?.valuesByMode[modeId]
    if (modeValue === undefined) {
      return { kind: 'unsupported', reason: `Shadow sub-property "${sub}" has no value for this mode — skipped.` }
    }
    modeValues[sub] = modeValue
  }

  const aliasTargets = SHADOW_SUB_PROPERTIES.map(sub => (isFigmaAlias(modeValues[sub]) ? modeValues[sub] : null))
  const allAliased = aliasTargets.every(target => target !== null)
  if (allAliased) {
    // Every sub-value must point at the *same* other token's *matching*
    // sub-property — anything else isn't a reference this app's own push
    // side would ever have produced (see write.mjs's buildAliasPassPayload).
    const targetTokens = SHADOW_SUB_PROPERTIES.map((sub, i) => {
      const targetId = aliasTargets[i]!.id
      const entry = shadowSubIndex.get(targetId)
      return entry && entry.subProperty === sub ? entry.token : null
    })
    const firstTarget = targetTokens[0]
    const consistent = firstTarget && targetTokens.every(t => t === firstTarget)
    if (consistent) {
      return { kind: 'alias', referenceTarget: firstTarget.path.join('.') }
    }
    return { kind: 'unsupported', reason: 'Shadow sub-properties alias inconsistent targets — skipped.' }
  }

  if (aliasTargets.some(target => target !== null)) {
    return { kind: 'unsupported', reason: 'Shadow has a mix of literal and aliased sub-properties — skipped.' }
  }

  const layer = dtcgShadowLayerFromFigma(modeValues as Record<ShadowSubProperty, unknown>, localUnit)
  if (!layer) {
    return { kind: 'unsupported', reason: 'One or more shadow sub-values could not be read — skipped.' }
  }
  return { kind: 'literal', rawValue: layer }
}

function unitForSub(rawValue: unknown, sub: 'offsetX' | 'offsetY' | 'blur' | 'spread'): 'px' | 'rem' {
  if (typeof rawValue !== 'object' || rawValue === null) return 'rem'
  const dimension = (rawValue as Record<string, unknown>)[sub]
  if (typeof dimension !== 'object' || dimension === null) return 'rem'
  const unit = (dimension as { unit?: unknown }).unit
  return unit === 'px' ? 'px' : 'rem'
}

// Base-only (see docs/plans/shadow-token-type-plan.md) — matches every
// local single-layer shadow token against its 5 Figma sub-variables (by
// the figmaId object stored on it), producing the same create/update/
// delete/skipped shapes buildBasePullPlan's generic per-variable loop
// does, but grouped by token instead of by individual Figma variable —
// necessary since one shadow token's identity spans 5 separate variables,
// not 1.
function deriveShadowPullEntries(params: {
  original: FlatToken[]
  working: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  modeId: string
}): { creates: PulledEntry[]; updates: PulledEntry[]; deletes: PulledEntry[]; skipped: SkippedVariable[] } {
  const { original, working, figmaMeta, modeId } = params
  const creates: PulledEntry[] = []
  const updates: PulledEntry[] = []
  const deletes: PulledEntry[] = []
  const skipped: SkippedVariable[] = []

  // Reverse index from a shadow sub-variable's Figma id back to the token +
  // sub-property it belongs to — needed to resolve a shadow-to-shadow alias
  // target, since (unlike every other type) a shadow token's figmaId is an
  // object of 5 ids, not 1, so it can't live in a plain string-keyed index.
  const shadowSubIndex = new Map<string, { token: FlatToken; subProperty: ShadowSubProperty }>()
  for (const t of original) {
    if (!isShadowFigmaId(t.figmaId)) continue
    for (const sub of SHADOW_SUB_PROPERTIES) {
      shadowSubIndex.set(t.figmaId[sub], { token: t, subProperty: sub })
    }
  }
  const workingByPath = new Map(working.map(w => [w.token.path.join('.'), w]))

  for (const token of original) {
    if (!isShadowFigmaId(token.figmaId)) continue
    const idSet = token.figmaId
    const path = token.path.join('.')

    // Any one of the 5 sub-variables missing from Figma entirely — treat
    // the whole shadow as deleted (unless working already dropped it).
    const missing = SHADOW_SUB_PROPERTIES.some(sub => !figmaMeta.variables[idSet[sub]])
    if (missing) {
      if (workingByPath.has(path)) {
        deletes.push(entryFrom('delete', token.layer, token.path, idSet, snapshotOf(token)))
      }
      continue
    }

    const localUnit = (sub: 'offsetX' | 'offsetY' | 'blur' | 'spread') => unitForSub(token.rawValue, sub)
    const derived = deriveShadowValue(idSet, figmaMeta, modeId, shadowSubIndex, localUnit)
    if (derived.kind === 'unsupported') {
      skipped.push({ variableId: idSet.color, name: `${token.path.join('/')} (shadow)`, reason: derived.reason })
      continue
    }

    const figmaSnapshot: DtcgSnapshot =
      derived.kind === 'alias'
        ? { type: 'shadow', referenceTarget: derived.referenceTarget, rawValue: undefined }
        : { type: 'shadow', referenceTarget: null, rawValue: derived.rawValue }

    const originalSnapshot = snapshotOf(token)
    if (snapshotEqual(figmaSnapshot, originalSnapshot)) continue

    const workingEntry = workingByPath.get(path)
    const workingSnapshot = workingEntry ? snapshotOf(workingEntry.token) : originalSnapshot
    const workingHasManualEdit = !snapshotEqual(workingSnapshot, originalSnapshot)

    if (workingHasManualEdit) {
      if (snapshotEqual(workingSnapshot, figmaSnapshot)) continue // already converged
      // Shadow conflicts aren't modeled as PullConflict (its figma-side shape assumes a single
      // resolvable value/reference, which a partially-diverged 5-variable shadow doesn't cleanly
      // fit) — surfaced as skipped instead, same as any other case this pass can't safely resolve
      // automatically. A human resolves it directly in Toky.
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (shadow)`,
        reason: 'Figma and a pending local edit disagree — resolve manually.',
      })
      continue
    }

    updates.push(entryFrom('update', token.layer, token.path, idSet, figmaSnapshot))
  }

  return { creates, updates, deletes, skipped }
}

interface LocalBorderValue {
  color: unknown
  width: unknown
  style: unknown
}

function unitForBorderWidth(token: FlatToken): 'px' | 'rem' {
  const resolved = token.resolvedValue
  if (typeof resolved !== 'object' || resolved === null) return 'rem'
  const width = (resolved as Record<string, unknown>).width
  if (typeof width !== 'object' || width === null) return 'rem'
  const unit = (width as { unit?: unknown }).unit
  return unit === 'px' ? 'px' : 'rem'
}

/**
 * Base-only (see docs/plans/border-token-type-plan.md decision 11) — matches every local border
 * composite token against its 3 Figma sub-variables (by the figmaId object stored on it),
 * mirroring deriveShadowPullEntries's shape.
 *
 * Unlike shadow, `color`/`width` are always references locally (decision 4), never inline
 * literals — a raw structural comparison against Figma's always-literal sub-variable values would
 * false-positive on every pull. So comparison uses the local token's already-resolved literal
 * (`resolvedValue`, fully reference-chased by flatten.ts's resolveReferences) rather than
 * `rawValue`. When something has genuinely changed: if only `style` differs, the update preserves
 * `color`/`width`'s original `{reference}` strings untouched and only swaps `style` — never
 * flattening a working reference into a literal. If `color` or `width` itself differs from what
 * the local reference currently resolves to, there's no safe reverse-mapping from an arbitrary
 * Figma literal back to "which primitive token has this value" — surfaced as `skipped` for a
 * human to resolve, same policy as shadow's unsupported/inconsistent cases.
 */
function deriveBorderPullEntries(params: {
  original: FlatToken[]
  working: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  modeId: string
}): { creates: PulledEntry[]; updates: PulledEntry[]; deletes: PulledEntry[]; skipped: SkippedVariable[] } {
  const { original, working, figmaMeta, modeId } = params
  const creates: PulledEntry[] = []
  const updates: PulledEntry[] = []
  const deletes: PulledEntry[] = []
  const skipped: SkippedVariable[] = []

  // Reverse index from a border sub-variable's Figma id back to the token + sub-property it
  // belongs to — needed to resolve a border-to-border alias target, same reasoning as shadow's.
  const borderSubIndex = new Map<string, { token: FlatToken; subProperty: BorderSubProperty }>()
  for (const t of original) {
    if (!isBorderFigmaId(t.figmaId)) continue
    for (const sub of BORDER_SUB_PROPERTIES) {
      borderSubIndex.set(t.figmaId[sub], { token: t, subProperty: sub })
    }
  }
  const workingByPath = new Map(working.map(w => [w.token.path.join('.'), w]))

  for (const token of original) {
    if (!isBorderFigmaId(token.figmaId)) continue
    const idSet = token.figmaId
    const path = token.path.join('.')

    // Any one of the 3 sub-variables missing from Figma entirely — treat the whole border token
    // as deleted (unless working already dropped it).
    const missing = BORDER_SUB_PROPERTIES.some(sub => !figmaMeta.variables[idSet[sub]])
    if (missing) {
      if (workingByPath.has(path)) {
        deletes.push(entryFrom('delete', token.layer, token.path, idSet, snapshotOf(token)))
      }
      continue
    }

    const modeValues: Partial<Record<BorderSubProperty, unknown>> = {}
    for (const sub of BORDER_SUB_PROPERTIES) {
      modeValues[sub] = figmaMeta.variables[idSet[sub]]?.valuesByMode[modeId]
    }
    if (BORDER_SUB_PROPERTIES.some(sub => modeValues[sub] === undefined)) {
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (border)`,
        reason: 'One or more border sub-properties has no value for this mode — skipped.',
      })
      continue
    }

    const aliasTargets = BORDER_SUB_PROPERTIES.map(sub => (isFigmaAlias(modeValues[sub]) ? modeValues[sub] : null))
    const allAliased = aliasTargets.every(target => target !== null)
    if (allAliased) {
      // Every sub-value must point at the *same* other token's *matching* sub-property — same
      // "not something our own push side would produce otherwise" policy as shadow's.
      const targetTokens = BORDER_SUB_PROPERTIES.map((sub, i) => {
        const targetId = aliasTargets[i]!.id
        const entry = borderSubIndex.get(targetId)
        return entry && entry.subProperty === sub ? entry.token : null
      })
      const firstTarget = targetTokens[0]
      const consistent = firstTarget && targetTokens.every(t => t === firstTarget)

      const figmaSnapshot: DtcgSnapshot = consistent
        ? { type: 'border', referenceTarget: firstTarget.path.join('.'), rawValue: undefined }
        : { type: 'border', referenceTarget: null, rawValue: undefined }
      if (!consistent) {
        skipped.push({
          variableId: idSet.color,
          name: `${token.path.join('/')} (border)`,
          reason: 'Border sub-properties alias inconsistent targets — skipped.',
        })
        continue
      }

      const originalSnapshot = snapshotOf(token)
      if (snapshotEqual(figmaSnapshot, originalSnapshot)) continue

      const workingEntry = workingByPath.get(path)
      const workingSnapshot = workingEntry ? snapshotOf(workingEntry.token) : originalSnapshot
      const workingHasManualEdit = !snapshotEqual(workingSnapshot, originalSnapshot)
      if (workingHasManualEdit) {
        if (snapshotEqual(workingSnapshot, figmaSnapshot)) continue
        skipped.push({
          variableId: idSet.color,
          name: `${token.path.join('/')} (border)`,
          reason: 'Figma and a pending local edit disagree — resolve manually.',
        })
        continue
      }

      updates.push(entryFrom('update', token.layer, token.path, idSet, figmaSnapshot))
      continue
    }

    if (aliasTargets.some(target => target !== null)) {
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (border)`,
        reason: 'Border has a mix of literal and aliased sub-properties — skipped.',
      })
      continue
    }

    // Literal case — compare against the local token's *resolved* value (color/width/style
    // chased through their reference chains), not its raw un-resolved reference strings.
    const figmaColor = modeValues.color
    if (typeof figmaColor !== 'object' || figmaColor === null || !('r' in figmaColor)) {
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (border)`,
        reason: 'Border color sub-value could not be read — skipped.',
      })
      continue
    }
    const figmaColorLiteral = dtcgColorFromFigma(figmaColor as { r: number; g: number; b: number; a: number })

    const rawWidth = modeValues.width
    if (typeof rawWidth !== 'number') {
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (border)`,
        reason: 'Border width sub-value could not be read — skipped.',
      })
      continue
    }
    const unit = unitForBorderWidth(token)
    const figmaWidthLiteral = { value: unit === 'rem' ? rawWidth / PX_PER_REM : rawWidth, unit }

    const figmaStyleKeyword = modeValues.style
    const local = token.resolvedValue as LocalBorderValue | undefined
    const colorMatches = local ? isLiteralValueEqual('color', figmaColorLiteral, local.color) : false
    const widthMatches = local ? isLiteralValueEqual('dimension', figmaWidthLiteral, local.width) : false
    const styleMatches = local ? figmaStyleKeyword === local.style : false

    if (colorMatches && widthMatches && styleMatches) continue // nothing changed

    if (!colorMatches || !widthMatches) {
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (border)`,
        reason:
          'Border color/width differs from what the local reference resolves to — no safe way to ' +
          'auto-write a literal without breaking the reference. Resolve manually in Toky.',
      })
      continue
    }

    // Only style differs — preserve color/width's original reference strings untouched.
    const styleReference = borderStyleReferenceFromKeyword(figmaStyleKeyword)
    if (!styleReference) {
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (border)`,
        reason: `Border style value "${String(figmaStyleKeyword)}" doesn't match a known keyword — skipped.`,
      })
      continue
    }
    const originalValue = token.rawValue as LocalBorderValue
    const figmaSnapshot: DtcgSnapshot = {
      type: 'border',
      referenceTarget: null,
      rawValue: { color: originalValue.color, width: originalValue.width, style: styleReference },
    }

    const originalSnapshot = snapshotOf(token)
    const workingEntry = workingByPath.get(path)
    const workingSnapshot = workingEntry ? snapshotOf(workingEntry.token) : originalSnapshot
    const workingHasManualEdit = !snapshotEqual(workingSnapshot, originalSnapshot)
    if (workingHasManualEdit) {
      if (snapshotEqual(workingSnapshot, figmaSnapshot)) continue
      skipped.push({
        variableId: idSet.color,
        name: `${token.path.join('/')} (border)`,
        reason: 'Figma and a pending local edit disagree — resolve manually.',
      })
      continue
    }

    updates.push(entryFrom('update', token.layer, token.path, idSet, figmaSnapshot))
  }

  return { creates, updates, deletes, skipped }
}

interface LocalTypographyValue {
  fontFamily: unknown
  fontSize: unknown
  fontWeight: unknown
  lineHeight: unknown
}

function unitForTypographyFontSize(token: FlatToken): 'px' | 'rem' {
  const resolved = token.resolvedValue
  if (typeof resolved !== 'object' || resolved === null) return 'rem'
  const fontSize = (resolved as Record<string, unknown>).fontSize
  if (typeof fontSize !== 'object' || fontSize === null) return 'rem'
  const unit = (fontSize as { unit?: unknown }).unit
  return unit === 'px' ? 'px' : 'rem'
}

// Reverse index: a fontFamily-typed token's resolved primary font name -> the {reference} string
// pointing at it. Needed to resolve a Figma-pulled fontFamily value back to whichever primitive
// token it matches — unlike border's fixed 9-keyword Style.* set, Font.Family.*/Text.Family.* is
// an open-ended, code-authored set with no fixed enum to hardcode against (docs/plans/typography-
// token-type-plan.md decision 4 and §6). Built over the *resolved* value so an Alias-layer token
// that's itself a reference to a Global primitive is indexed by what it actually resolves to, same
// as any other primitive. First match wins if more than one token shares a value.
function buildFontFamilyReferenceIndex(tokens: FlatToken[]): Map<string, string> {
  const index = new Map<string, string>()
  for (const t of tokens) {
    if (t.type !== 'fontFamily' || !Array.isArray(t.resolvedValue) || t.resolvedValue.length === 0) continue
    const primary = String(t.resolvedValue[0])
    if (!index.has(primary)) index.set(primary, t.path.join('.'))
  }
  return index
}

// Same idea as buildFontFamilyReferenceIndex, for fontWeight-typed tokens.
function buildFontWeightReferenceIndex(tokens: FlatToken[]): Map<number, string> {
  const index = new Map<number, string>()
  for (const t of tokens) {
    if (t.type !== 'fontWeight' || typeof t.resolvedValue !== 'number') continue
    if (!index.has(t.resolvedValue)) index.set(t.resolvedValue, t.path.join('.'))
  }
  return index
}

type TypographyDerivedValue =
  | { kind: 'literal'; rawValue: LocalTypographyValue }
  | { kind: 'alias'; referenceTarget: string }
  | { kind: 'unsupported'; reason: string }

/**
 * Reconstructs one DTCG typography value from its 4 already-fetched Figma sub-values, shared by
 * both the Base-layer loop (deriveTypographyPullEntries) and the brand-layer loop
 * (buildBrandPullPlan's typography pass) — the reconstruction logic itself doesn't differ between
 * the two, only what each does with the result (mirrors border's split, minus a shared-core
 * function border didn't need since it only ever ran Base-only).
 *
 * fontFamily/fontWeight are always references locally (decision 4) — a difference from
 * `resolved` is resolved via `fontFamilyIndex`/`fontWeightIndex` and rewrites just that one
 * sub-field's `{reference}` string, preserving `rawValue`'s other fields untouched, mirroring
 * border's "only style differs -> preserve color/width" carve-out. fontSize/lineHeight are free
 * literal-or-reference (decision 4) — same conservative policy as border's color/width: any
 * difference from `resolved` is surfaced as `unsupported` rather than guessing which reference
 * target (if any) the new value should point at.
 */
function deriveTypographyValue(
  idSet: Record<TypographySubProperty, string>,
  figmaMeta: FigmaVariablesMeta,
  modeId: string,
  typographySubIndex: Map<string, { token: FlatToken; subProperty: TypographySubProperty }>,
  fontFamilyIndex: Map<string, string>,
  fontWeightIndex: Map<number, string>,
  resolved: LocalTypographyValue,
  rawValue: LocalTypographyValue,
  localUnit: () => 'px' | 'rem',
): TypographyDerivedValue {
  const modeValues: Partial<Record<TypographySubProperty, unknown>> = {}
  for (const sub of TYPOGRAPHY_SUB_PROPERTIES) {
    modeValues[sub] = figmaMeta.variables[idSet[sub]]?.valuesByMode[modeId]
  }
  if (TYPOGRAPHY_SUB_PROPERTIES.some(sub => modeValues[sub] === undefined)) {
    return {
      kind: 'unsupported',
      reason: 'One or more typography sub-properties has no value for this mode — skipped.',
    }
  }

  const aliasTargets = TYPOGRAPHY_SUB_PROPERTIES.map(sub => (isFigmaAlias(modeValues[sub]) ? modeValues[sub] : null))
  const allAliased = aliasTargets.every(target => target !== null)
  if (allAliased) {
    // Every sub-value must point at the *same* other token's *matching* sub-property — same "not
    // something our own push side would produce otherwise" policy as shadow's/border's.
    const targetTokens = TYPOGRAPHY_SUB_PROPERTIES.map((sub, i) => {
      const targetId = aliasTargets[i]!.id
      const entry = typographySubIndex.get(targetId)
      return entry && entry.subProperty === sub ? entry.token : null
    })
    const firstTarget = targetTokens[0]
    const consistent = firstTarget && targetTokens.every(t => t === firstTarget)
    if (consistent) return { kind: 'alias', referenceTarget: firstTarget.path.join('.') }
    return { kind: 'unsupported', reason: 'Typography sub-properties alias inconsistent targets — skipped.' }
  }

  if (aliasTargets.some(target => target !== null)) {
    return { kind: 'unsupported', reason: 'Typography has a mix of literal and aliased sub-properties — skipped.' }
  }

  // Literal case — fontSize/lineHeight compare against the local token's *resolved* value first
  // (color/width-style bundled conservatism, per this function's own doc comment above).
  const rawFontSize = modeValues.fontSize
  if (typeof rawFontSize !== 'number') {
    return { kind: 'unsupported', reason: 'Typography fontSize sub-value could not be read — skipped.' }
  }
  const unit = localUnit()
  const figmaFontSizeLiteral = { value: unit === 'rem' ? rawFontSize / PX_PER_REM : rawFontSize, unit }
  const figmaLineHeight = modeValues.lineHeight
  if (typeof figmaLineHeight !== 'number') {
    return { kind: 'unsupported', reason: 'Typography lineHeight sub-value could not be read — skipped.' }
  }

  const fontSizeMatches = isLiteralValueEqual('dimension', figmaFontSizeLiteral, resolved.fontSize)
  const lineHeightMatches = figmaLineHeight === resolved.lineHeight
  if (!fontSizeMatches || !lineHeightMatches) {
    return {
      kind: 'unsupported',
      reason:
        'Typography fontSize/lineHeight differs from what the local value resolves to — no safe way to ' +
        'auto-write a literal without knowing which reference target (if any) it should point at instead. ' +
        'Resolve manually in Toky.',
    }
  }

  const figmaFontWeightNumeric = fontWeightNumberFromKeyword(modeValues.fontWeight)
  if (figmaFontWeightNumeric === undefined) {
    return {
      kind: 'unsupported',
      reason: `Font-weight value "${String(modeValues.fontWeight)}" doesn't match a known DTCG keyword — skipped.`,
    }
  }
  const figmaFontFamilyPrimary = typeof modeValues.fontFamily === 'string' ? modeValues.fontFamily : undefined
  if (figmaFontFamilyPrimary === undefined) {
    return { kind: 'unsupported', reason: 'Typography fontFamily sub-value could not be read — skipped.' }
  }

  const resolvedFontFamilyPrimary = Array.isArray(resolved.fontFamily) ? String(resolved.fontFamily[0]) : undefined
  let fontFamily = rawValue.fontFamily
  if (figmaFontFamilyPrimary !== resolvedFontFamilyPrimary) {
    const target = fontFamilyIndex.get(figmaFontFamilyPrimary)
    if (!target) {
      return {
        kind: 'unsupported',
        reason: `Typography fontFamily value "${figmaFontFamilyPrimary}" doesn't match a known Font.Family primitive — skipped.`,
      }
    }
    fontFamily = `{${target}}`
  }

  let fontWeight = rawValue.fontWeight
  if (figmaFontWeightNumeric !== resolved.fontWeight) {
    const target = fontWeightIndex.get(figmaFontWeightNumeric)
    if (!target) {
      return {
        kind: 'unsupported',
        reason: `Typography fontWeight value "${figmaFontWeightNumeric}" doesn't match a known Font.Weight primitive — skipped.`,
      }
    }
    fontWeight = `{${target}}`
  }

  return {
    kind: 'literal',
    rawValue: { fontFamily, fontSize: rawValue.fontSize, fontWeight, lineHeight: rawValue.lineHeight },
  }
}

/**
 * Base-only entry point — matches every local typography token against its 4 Figma sub-variables
 * (by the figmaId object stored on it), mirroring deriveShadowPullEntries/deriveBorderPullEntries's
 * shape. Unlike border (decision 11), typography *does* support brand-level pull (decision 8) —
 * that's a separate pass inside buildBrandPullPlan, sharing deriveTypographyValue's reconstruction
 * core but not this function itself (brand's create/update/delete classification differs from
 * Base's plain update-in-place, same reason buildBrandPullPlan's generic loop is a different
 * function from buildBasePullPlan's to begin with).
 */
function deriveTypographyPullEntries(params: {
  original: FlatToken[]
  working: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  modeId: string
}): { creates: PulledEntry[]; updates: PulledEntry[]; deletes: PulledEntry[]; skipped: SkippedVariable[] } {
  const { original, working, figmaMeta, modeId } = params
  const creates: PulledEntry[] = []
  const updates: PulledEntry[] = []
  const deletes: PulledEntry[] = []
  const skipped: SkippedVariable[] = []

  const typographySubIndex = new Map<string, { token: FlatToken; subProperty: TypographySubProperty }>()
  for (const t of original) {
    if (!isTypographyFigmaId(t.figmaId)) continue
    for (const sub of TYPOGRAPHY_SUB_PROPERTIES) {
      typographySubIndex.set(t.figmaId[sub], { token: t, subProperty: sub })
    }
  }
  const fontFamilyIndex = buildFontFamilyReferenceIndex(original)
  const fontWeightIndex = buildFontWeightReferenceIndex(original)
  const workingByPath = new Map(working.map(w => [w.token.path.join('.'), w]))

  for (const token of original) {
    if (!isTypographyFigmaId(token.figmaId)) continue
    const idSet = token.figmaId
    const path = token.path.join('.')

    const missing = TYPOGRAPHY_SUB_PROPERTIES.some(sub => !figmaMeta.variables[idSet[sub]])
    if (missing) {
      if (workingByPath.has(path)) {
        deletes.push(entryFrom('delete', token.layer, token.path, idSet, snapshotOf(token)))
      }
      continue
    }

    const derived = deriveTypographyValue(
      idSet,
      figmaMeta,
      modeId,
      typographySubIndex,
      fontFamilyIndex,
      fontWeightIndex,
      token.resolvedValue as LocalTypographyValue,
      token.rawValue as LocalTypographyValue,
      () => unitForTypographyFontSize(token),
    )
    if (derived.kind === 'unsupported') {
      skipped.push({
        variableId: idSet.fontFamily,
        name: `${token.path.join('/')} (typography)`,
        reason: derived.reason,
      })
      continue
    }

    const figmaSnapshot: DtcgSnapshot =
      derived.kind === 'alias'
        ? { type: 'typography', referenceTarget: derived.referenceTarget, rawValue: undefined }
        : { type: 'typography', referenceTarget: null, rawValue: derived.rawValue }

    const originalSnapshot = snapshotOf(token)
    if (snapshotEqual(figmaSnapshot, originalSnapshot)) continue

    const workingEntry = workingByPath.get(path)
    const workingSnapshot = workingEntry ? snapshotOf(workingEntry.token) : originalSnapshot
    const workingHasManualEdit = !snapshotEqual(workingSnapshot, originalSnapshot)

    if (workingHasManualEdit) {
      if (snapshotEqual(workingSnapshot, figmaSnapshot)) continue
      skipped.push({
        variableId: idSet.fontFamily,
        name: `${token.path.join('/')} (typography)`,
        reason: 'Figma and a pending local edit disagree — resolve manually.',
      })
      continue
    }

    updates.push(entryFrom('update', token.layer, token.path, idSet, figmaSnapshot))
  }

  return { creates, updates, deletes, skipped }
}

function unitForResponsiveDimensionSub(rawResponsive: unknown, sub: ResponsiveDimensionSubProperty): 'px' | 'rem' {
  if (typeof rawResponsive !== 'object' || rawResponsive === null) return 'rem'
  const value = (rawResponsive as Record<string, unknown>)[sub]
  if (typeof value !== 'object' || value === null) return 'rem'
  const unit = (value as { unit?: unknown }).unit
  return unit === 'px' ? 'px' : 'rem'
}

type ResponsiveDimensionDerivedValue =
  | { kind: 'literal'; responsive: Record<ResponsiveDimensionSubProperty, unknown> }
  | { kind: 'unsupported'; reason: string }

/**
 * Reconstructs one responsive dimension token's 3 breakpoint values from its 3 already-fetched
 * Figma sub-values, shared by both the Base-layer loop (deriveResponsiveDimensionPullEntries) and
 * the brand-layer loop (deriveBrandResponsiveDimensionPullEntries) — mirrors deriveTypographyValue's
 * own Base/brand split.
 *
 * Unlike typography's fontFamily/fontWeight (always references, decision 4 of that plan), every
 * breakpoint here is free literal-or-reference (docs/plans/responsive-dimension-token-plan.md
 * decision 3) — so, mirroring border's width/typography's fontSize/lineHeight, a breakpoint that
 * disagrees with the local *resolved* value is only safely auto-writable when the local sub-value
 * is itself already a literal; a reference-backed one is surfaced as unsupported rather than
 * guessing which reference (if any) it should point at instead. There's also no whole-composite
 * "all 3 sub-properties alias the same target" reconstruction the way shadow/typography have —
 * decision 2's mutual exclusivity means a responsive dimension token is never itself a whole-token
 * reference, so this app's own push side (write.mjs's buildAliasPassPayload) never writes a
 * VARIABLE_ALIAS for one of these 3 sub-variables; encountering one on pull is treated as
 * unsupported, not reconstructed.
 */
function deriveResponsiveDimensionValue(
  idSet: Record<ResponsiveDimensionSubProperty, string>,
  figmaMeta: FigmaVariablesMeta,
  modeId: string,
  resolved: Record<ResponsiveDimensionSubProperty, unknown> | null,
  rawResponsive: Record<ResponsiveDimensionSubProperty, unknown> | null,
): ResponsiveDimensionDerivedValue {
  const modeValues: Partial<Record<ResponsiveDimensionSubProperty, unknown>> = {}
  for (const sub of RESPONSIVE_DIMENSION_SUB_PROPERTIES) {
    modeValues[sub] = figmaMeta.variables[idSet[sub]]?.valuesByMode[modeId]
  }
  if (RESPONSIVE_DIMENSION_SUB_PROPERTIES.some(sub => modeValues[sub] === undefined)) {
    return {
      kind: 'unsupported',
      reason: 'One or more responsive dimension breakpoints has no value for this mode — skipped.',
    }
  }
  if (RESPONSIVE_DIMENSION_SUB_PROPERTIES.some(sub => isFigmaAlias(modeValues[sub]))) {
    return {
      kind: 'unsupported',
      reason:
        "A responsive dimension breakpoint is a Figma alias — not something this app's own push side produces — skipped.",
    }
  }

  const figmaLiteral = dtcgResponsiveDimensionFromFigma(
    modeValues as Record<ResponsiveDimensionSubProperty, unknown>,
    sub => unitForResponsiveDimensionSub(rawResponsive, sub),
  )
  if (!figmaLiteral) {
    return {
      kind: 'unsupported',
      reason: 'One or more responsive dimension breakpoint values could not be read — skipped.',
    }
  }

  const next: Partial<Record<ResponsiveDimensionSubProperty, unknown>> = {}
  for (const sub of RESPONSIVE_DIMENSION_SUB_PROPERTIES) {
    const resolvedSub = resolved?.[sub]
    const rawSub = rawResponsive?.[sub]
    if (isLiteralValueEqual('dimension', figmaLiteral[sub], resolvedSub)) {
      next[sub] = rawSub // unchanged — preserve whatever's there (literal or reference)
      continue
    }
    if (typeof rawSub === 'string') {
      return {
        kind: 'unsupported',
        reason:
          `Responsive dimension breakpoint "${sub}" differs from what the local value resolves to — no safe way ` +
          'to auto-write a literal without knowing which reference target it should point at instead. Resolve ' +
          'manually in Toky.',
      }
    }
    next[sub] = figmaLiteral[sub]
  }

  return { kind: 'literal', responsive: next as Record<ResponsiveDimensionSubProperty, unknown> }
}

// A responsive dimension entry's own equality/snapshot machinery — entryFrom/DtcgSnapshot don't
// fit (their single `rawValue` field can't carry both the mobile-mirrored $value *and* the
// separate $extensions breakpoint map — see PulledEntry.responsive's own comment).
function responsiveSnapshotEqual(
  a: Record<ResponsiveDimensionSubProperty, unknown> | null,
  b: Record<ResponsiveDimensionSubProperty, unknown> | null,
): boolean {
  if (!a || !b) return a === b
  return RESPONSIVE_DIMENSION_SUB_PROPERTIES.every(sub => isLiteralValueEqual('dimension', a[sub], b[sub]))
}

function responsiveEntryFrom(
  kind: PulledEntry['kind'],
  layer: TokenLayer,
  path: string[],
  figmaId: FigmaId,
  responsive: Record<ResponsiveDimensionSubProperty, unknown>,
): PulledEntry {
  return {
    kind,
    layer,
    path,
    figmaId,
    type: 'dimension',
    // decision 4: $value always mirrors mobile.
    rawValue: responsive.mobile,
    referenceTarget: null,
    responsive: responsive as ResponsiveDimensionValue,
  }
}

/**
 * Base-only entry point — matches every local responsive dimension token against its 3 Figma
 * sub-variables (by the figmaId object stored on it), mirroring deriveTypographyPullEntries's
 * shape. Responsive dimension *does* support brand-level pull (decision 7) — a separate pass
 * inside buildBrandPullPlan, sharing deriveResponsiveDimensionValue's reconstruction core, same
 * split as typography's own Base/brand functions.
 */
function deriveResponsiveDimensionPullEntries(params: {
  original: FlatToken[]
  working: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  modeId: string
}): { creates: PulledEntry[]; updates: PulledEntry[]; deletes: PulledEntry[]; skipped: SkippedVariable[] } {
  const { original, working, figmaMeta, modeId } = params
  const creates: PulledEntry[] = []
  const updates: PulledEntry[] = []
  const deletes: PulledEntry[] = []
  const skipped: SkippedVariable[] = []

  const workingByPath = new Map(working.map(w => [w.token.path.join('.'), w]))

  for (const token of original) {
    if (!isResponsiveDimensionFigmaId(token.figmaId)) continue
    const idSet = token.figmaId
    const path = token.path.join('.')

    const missing = RESPONSIVE_DIMENSION_SUB_PROPERTIES.some(sub => !figmaMeta.variables[idSet[sub]])
    if (missing) {
      if (workingByPath.has(path) && token.responsive) {
        deletes.push(
          responsiveEntryFrom(
            'delete',
            token.layer,
            token.path,
            idSet,
            token.responsive as unknown as Record<ResponsiveDimensionSubProperty, unknown>,
          ),
        )
      }
      continue
    }

    const derived = deriveResponsiveDimensionValue(
      idSet,
      figmaMeta,
      modeId,
      token.resolvedResponsive as Record<ResponsiveDimensionSubProperty, unknown> | null,
      token.responsive as Record<ResponsiveDimensionSubProperty, unknown> | null,
    )
    if (derived.kind === 'unsupported') {
      skipped.push({
        variableId: idSet.mobile,
        name: `${token.path.join('/')} (responsive dimension)`,
        reason: derived.reason,
      })
      continue
    }

    const originalResponsive = token.responsive as Record<ResponsiveDimensionSubProperty, unknown> | null
    if (responsiveSnapshotEqual(derived.responsive, originalResponsive)) continue

    const workingEntry = workingByPath.get(path)
    const workingResponsive = workingEntry
      ? (workingEntry.token.responsive as Record<ResponsiveDimensionSubProperty, unknown> | null)
      : originalResponsive
    const workingHasManualEdit = !responsiveSnapshotEqual(workingResponsive, originalResponsive)

    if (workingHasManualEdit) {
      if (responsiveSnapshotEqual(workingResponsive, derived.responsive)) continue
      skipped.push({
        variableId: idSet.mobile,
        name: `${token.path.join('/')} (responsive dimension)`,
        reason: 'Figma and a pending local edit disagree — resolve manually.',
      })
      continue
    }

    updates.push(responsiveEntryFrom('update', token.layer, token.path, idSet, derived.responsive))
  }

  return { creates, updates, deletes, skipped }
}

/**
 * Brand-layer counterpart to deriveResponsiveDimensionPullEntries — responsive dimension is one of
 * the composite types that supports brand overrides (decision 7, same as typography's decision 8).
 * Shares deriveResponsiveDimensionValue's reconstruction core, but classifies the result using
 * buildBrandPullPlan's own create/update/delete/inherited rules instead of Base's plain
 * update-in-place — same reason deriveBrandTypographyPullEntries is a separate function from
 * deriveResponsiveDimensionPullEntries.
 */
function deriveBrandResponsiveDimensionPullEntries(params: {
  baseOriginal: FlatToken[]
  brandOriginal: FlatToken[]
  brandWorking: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  brandModeId: string
}): { creates: PulledEntry[]; updates: PulledEntry[]; deletes: PulledEntry[]; skipped: SkippedVariable[] } {
  const { baseOriginal, brandOriginal, brandWorking, figmaMeta, brandModeId } = params
  const creates: PulledEntry[] = []
  const updates: PulledEntry[] = []
  const deletes: PulledEntry[] = []
  const skipped: SkippedVariable[] = []

  const brandOriginalByPath = new Map(brandOriginal.map(t => [t.path.join('.'), t]))
  const brandWorkingByPath = new Map(brandWorking.map(w => [w.token.path.join('.'), w]))

  for (const baseToken of baseOriginal) {
    if (!isResponsiveDimensionFigmaId(baseToken.figmaId)) continue
    const idSet = baseToken.figmaId
    const path = baseToken.path.join('.')
    const override = brandOriginalByPath.get(path)

    // Base's Figma variables for this token are gone entirely — the Base plan
    // (deriveResponsiveDimensionPullEntries) already proposes deleting the Base token itself;
    // clean up a dangling brand override here too, same policy as
    // deriveBrandTypographyPullEntries's own equivalent branch.
    const missing = RESPONSIVE_DIMENSION_SUB_PROPERTIES.some(sub => !figmaMeta.variables[idSet[sub]])
    if (missing) {
      if (override?.responsive && brandWorkingByPath.has(path)) {
        deletes.push(
          responsiveEntryFrom(
            'delete',
            override.layer,
            override.path,
            idSet,
            override.responsive as unknown as Record<ResponsiveDimensionSubProperty, unknown>,
          ),
        )
      }
      continue
    }

    // The reference for comparison purposes is whatever's currently effective for this brand —
    // its own override if one exists, else the inherited Base token.
    const referenceToken = override ?? baseToken
    const derived = deriveResponsiveDimensionValue(
      idSet,
      figmaMeta,
      brandModeId,
      referenceToken.resolvedResponsive as Record<ResponsiveDimensionSubProperty, unknown> | null,
      referenceToken.responsive as Record<ResponsiveDimensionSubProperty, unknown> | null,
    )
    if (derived.kind === 'unsupported') {
      skipped.push({
        variableId: idSet.mobile,
        name: `${baseToken.path.join('/')} (responsive dimension)`,
        reason: derived.reason,
      })
      continue
    }

    const inheritedResponsive = baseToken.responsive as Record<ResponsiveDimensionSubProperty, unknown> | null
    const originalResponsive = override
      ? (override.responsive as Record<ResponsiveDimensionSubProperty, unknown> | null)
      : inheritedResponsive
    if (responsiveSnapshotEqual(derived.responsive, originalResponsive)) continue

    const workingEntry = brandWorkingByPath.get(path)
    const workingResponsive = workingEntry
      ? (workingEntry.token.responsive as Record<ResponsiveDimensionSubProperty, unknown> | null)
      : originalResponsive
    const workingHasManualEdit = !responsiveSnapshotEqual(workingResponsive, originalResponsive)

    if (workingHasManualEdit) {
      if (responsiveSnapshotEqual(workingResponsive, derived.responsive)) continue
      skipped.push({
        variableId: idSet.mobile,
        name: `${baseToken.path.join('/')} (responsive dimension)`,
        reason: 'Figma and a pending local edit disagree — resolve manually.',
      })
      continue
    }

    if (!override) {
      creates.push(responsiveEntryFrom('create', baseToken.layer, baseToken.path, idSet, derived.responsive))
    } else if (responsiveSnapshotEqual(derived.responsive, inheritedResponsive)) {
      deletes.push(responsiveEntryFrom('delete', baseToken.layer, baseToken.path, idSet, derived.responsive))
    } else {
      updates.push(responsiveEntryFrom('update', baseToken.layer, baseToken.path, idSet, derived.responsive))
    }
  }

  return { creates, updates, deletes, skipped }
}

/**
 * Base plan: matches every Figma variable (Base mode) against `original`
 * (the server-loaded Base tokens) by figmaId.
 * - No match -> `create` (unless the variable's name doesn't map onto one
 *   of the three known layers, in which case it's `skipped`).
 * - Match, value changed from `original`, `working` still matches
 *   `original` -> clean `update`.
 * - Match, value changed from `original`, `working` *also* differs from
 *   `original` -> a manual edit is in progress; `conflict` unless the
 *   manual edit already happens to match Figma's value (converged, no-op).
 * - Any `original` token whose figmaId is no longer in Figma's variable
 *   set -> `delete` (unless `working` already deleted it itself).
 */
export function buildBasePullPlan(params: {
  original: FlatToken[]
  working: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  baseModeId: string
}): PullPlan {
  const { original, working, figmaMeta, baseModeId } = params
  const plan = emptyPlan()

  // Shadow tokens are excluded from both indexes — their figmaId is an
  // object of 5 sub-ids, not the single string this generic per-variable
  // loop (and deriveValue's alias-target lookup) is keyed by. They're
  // matched separately by deriveShadowPullEntries below.
  const baseIndex = new Map(
    original
      .filter((t): t is FlatToken & { figmaId: string } => typeof t.figmaId === 'string')
      .map(t => [t.figmaId, t]),
  )
  const originalByPath = new Map(original.map(t => [t.path.join('.'), t]))
  const workingByPath = new Map(working.map(w => [w.token.path.join('.'), w]))
  // Anything already linked to a Figma variable in `working` but not yet in
  // `original` — a create or an adopted-update from an earlier pull that's
  // been Applied but not yet Submitted. `original` (and baseIndex) won't
  // reflect it until a submit lands, so without this a not-yet-submitted
  // pull's result gets proposed again on every subsequent pull.
  const workingFigmaIndex = new Map(
    working
      .filter(
        (w): w is WorkingToken & { token: FlatToken & { figmaId: string } } => typeof w.token.figmaId === 'string',
      )
      .map(w => [w.token.figmaId, w]),
  )
  // Every Figma variable id that belongs to some local shadow token's
  // 5-sub-id set — skipped by the generic loop below (it would otherwise
  // see a shadow's bare FLOAT/COLOR sub-variable and misinterpret it as a
  // stray, unrelated number/color token to create).
  const shadowSubVariableIds = new Set(
    original.flatMap(t => (isShadowFigmaId(t.figmaId) ? Object.values(t.figmaId) : [])),
  )
  // Same exclusion, for a local border token's 3-sub-id set — see
  // docs/plans/border-token-type-plan.md. Matched separately by deriveBorderPullEntries below.
  const borderSubVariableIds = new Set(
    original.flatMap(t => (isBorderFigmaId(t.figmaId) ? Object.values(t.figmaId) : [])),
  )
  // Same exclusion, for a local typography token's 4-sub-id set — see
  // docs/plans/typography-token-type-plan.md. Matched separately by deriveTypographyPullEntries below.
  const typographySubVariableIds = new Set(
    original.flatMap(t => (isTypographyFigmaId(t.figmaId) ? Object.values(t.figmaId) : [])),
  )
  // Same exclusion, for a local responsive dimension token's 3-sub-id set — see
  // docs/plans/responsive-dimension-token-plan.md. Matched separately by
  // deriveResponsiveDimensionPullEntries below.
  const responsiveDimensionSubVariableIds = new Set(
    original.flatMap(t => (isResponsiveDimensionFigmaId(t.figmaId) ? Object.values(t.figmaId) : [])),
  )

  for (const variable of Object.values(figmaMeta.variables)) {
    if (
      shadowSubVariableIds.has(variable.id) ||
      borderSubVariableIds.has(variable.id) ||
      typographySubVariableIds.has(variable.id) ||
      responsiveDimensionSubVariableIds.has(variable.id)
    )
      continue
    const modeValue = variable.valuesByMode[baseModeId]
    if (modeValue === undefined) continue

    const matched = baseIndex.get(variable.id)

    const derived = deriveValue(variable, modeValue, baseIndex, matched)
    if (derived.kind === 'unsupported') {
      plan.skipped.push({ variableId: variable.id, name: variable.name, reason: derived.reason })
      continue
    }
    const figmaSnapshot = derivedSnapshot(derived)

    if (!matched) {
      const stagedOnly = workingFigmaIndex.get(variable.id)
      if (stagedOnly) {
        // Already staged in working (create or adopt), pending submit —
        // compare against what's staged, not against `original` (which
        // doesn't know about it yet).
        const stagedSnapshot = snapshotOf(stagedOnly.token)
        if (snapshotEqual(figmaSnapshot, stagedSnapshot)) continue // nothing new since it was staged
        plan.updates.push(
          entryFrom('update', stagedOnly.token.layer, stagedOnly.token.path, variable.id, figmaSnapshot),
        )
        continue
      }

      const path = pathFromFigmaVariableName(variable.name)
      const layer = LAYER_BY_KEY[path[0]]
      if (!layer) {
        plan.skipped.push({
          variableId: variable.id,
          name: variable.name,
          reason: `"${path[0]}" is not a recognized layer — skipped.`,
        })
        continue
      }

      // Adopt, don't duplicate: no variableId match anywhere, but a token
      // already sits at exactly the path this variable's name maps to,
      // unlinked (no figmaId of its own) — e.g. created by hand before ever
      // pulling, or a link dropped on write by an old bug (see edit.ts's
      // applyDiffToDocument). Safe specifically because it's an *exact
      // path* match, not a fuzzy name guess — path is already this
      // codebase's own identity key (computeDiff keys WorkingToken.id by
      // it). Backfills the figmaId via an `update`, not a `create` — even
      // when the value already matches, since otherwise every future pull
      // would keep proposing the same "create" again.
      const unlinked = originalByPath.get(path.join('.'))
      if (unlinked && !unlinked.figmaId) {
        plan.updates.push(entryFrom('update', unlinked.layer, unlinked.path, variable.id, figmaSnapshot))
        continue
      }

      plan.creates.push(entryFrom('create', layer, path, variable.id, figmaSnapshot))
      continue
    }

    const originalSnapshot = snapshotOf(matched)
    if (snapshotEqual(figmaSnapshot, originalSnapshot)) continue // Figma unchanged since we last knew

    const path = matched.path.join('.')
    const workingEntry = workingByPath.get(path)
    const workingSnapshot = workingEntry ? snapshotOf(workingEntry.token) : originalSnapshot
    const workingHasManualEdit = !snapshotEqual(workingSnapshot, originalSnapshot)

    if (workingHasManualEdit) {
      if (snapshotEqual(workingSnapshot, figmaSnapshot)) continue // already converged
      plan.conflicts.push({
        tokenId: workingEntry!.id,
        path: matched.path,
        layer: matched.layer,
        figmaId: variable.id,
        workingValue: snapshotToEffectiveValue(workingSnapshot),
        figmaValue: snapshotToEffectiveValue(figmaSnapshot),
        figma: {
          type: figmaSnapshot.type,
          rawValue: figmaSnapshot.rawValue,
          referenceTarget: figmaSnapshot.referenceTarget,
        },
      })
      continue
    }

    plan.updates.push(entryFrom('update', matched.layer, matched.path, variable.id, figmaSnapshot))
  }

  for (const token of original) {
    // Shadow deletion is handled by deriveShadowPullEntries below (its
    // figmaId is 5 sub-ids, not 1 — see docs/plans/shadow-token-type-plan.md).
    if (typeof token.figmaId !== 'string' || figmaMeta.variables[token.figmaId]) continue
    const path = token.path.join('.')
    if (!workingByPath.has(path)) continue // working already deleted it — nothing new to propose
    plan.deletes.push(entryFrom('delete', token.layer, token.path, token.figmaId, snapshotOf(token)))
  }

  const shadowEntries = deriveShadowPullEntries({ original, working, figmaMeta, modeId: baseModeId })
  plan.creates.push(...shadowEntries.creates)
  plan.updates.push(...shadowEntries.updates)
  plan.deletes.push(...shadowEntries.deletes)
  plan.skipped.push(...shadowEntries.skipped)

  const borderEntries = deriveBorderPullEntries({ original, working, figmaMeta, modeId: baseModeId })
  plan.creates.push(...borderEntries.creates)
  plan.updates.push(...borderEntries.updates)
  plan.deletes.push(...borderEntries.deletes)
  plan.skipped.push(...borderEntries.skipped)

  const typographyEntries = deriveTypographyPullEntries({ original, working, figmaMeta, modeId: baseModeId })
  plan.creates.push(...typographyEntries.creates)
  plan.updates.push(...typographyEntries.updates)
  plan.deletes.push(...typographyEntries.deletes)
  plan.skipped.push(...typographyEntries.skipped)

  const responsiveDimensionEntries = deriveResponsiveDimensionPullEntries({
    original,
    working,
    figmaMeta,
    modeId: baseModeId,
  })
  plan.creates.push(...responsiveDimensionEntries.creates)
  plan.updates.push(...responsiveDimensionEntries.updates)
  plan.deletes.push(...responsiveDimensionEntries.deletes)
  plan.skipped.push(...responsiveDimensionEntries.skipped)

  return plan
}

/**
 * Brand-layer counterpart to deriveTypographyPullEntries — typography is one of the few composite
 * types that supports brand overrides (decision 8, unlike border's Base-only decision 11). Shares
 * deriveTypographyValue's reconstruction core, but classifies the result using buildBrandPullPlan's
 * own create/update/delete/inherited rules (see its doc comment) instead of Base's plain
 * update-in-place — same reason buildBrandPullPlan's generic single-variable loop is already a
 * separate function from buildBasePullPlan's.
 */
function deriveBrandTypographyPullEntries(params: {
  baseOriginal: FlatToken[]
  brandOriginal: FlatToken[]
  brandWorking: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  brandModeId: string
}): { creates: PulledEntry[]; updates: PulledEntry[]; deletes: PulledEntry[]; skipped: SkippedVariable[] } {
  const { baseOriginal, brandOriginal, brandWorking, figmaMeta, brandModeId } = params
  const creates: PulledEntry[] = []
  const updates: PulledEntry[] = []
  const deletes: PulledEntry[] = []
  const skipped: SkippedVariable[] = []

  const typographySubIndex = new Map<string, { token: FlatToken; subProperty: TypographySubProperty }>()
  for (const t of baseOriginal) {
    if (!isTypographyFigmaId(t.figmaId)) continue
    for (const sub of TYPOGRAPHY_SUB_PROPERTIES) {
      typographySubIndex.set(t.figmaId[sub], { token: t, subProperty: sub })
    }
  }
  const fontFamilyIndex = buildFontFamilyReferenceIndex(baseOriginal)
  const fontWeightIndex = buildFontWeightReferenceIndex(baseOriginal)
  const brandOriginalByPath = new Map(brandOriginal.map(t => [t.path.join('.'), t]))
  const brandWorkingByPath = new Map(brandWorking.map(w => [w.token.path.join('.'), w]))

  for (const baseToken of baseOriginal) {
    if (!isTypographyFigmaId(baseToken.figmaId)) continue
    const idSet = baseToken.figmaId
    const path = baseToken.path.join('.')
    const override = brandOriginalByPath.get(path)

    // Base's Figma variables for this token are gone entirely — the Base plan
    // (deriveTypographyPullEntries) already proposes deleting the Base token itself; clean up a
    // dangling brand override here too, same "don't leave an override pointing at a token that's
    // about to disappear" policy as buildBrandPullPlan's own trailing cleanup loop.
    const missing = TYPOGRAPHY_SUB_PROPERTIES.some(sub => !figmaMeta.variables[idSet[sub]])
    if (missing) {
      if (override && brandWorkingByPath.has(path)) {
        deletes.push(entryFrom('delete', override.layer, override.path, idSet, snapshotOf(override)))
      }
      continue
    }

    // The reference for comparison/merge purposes is whatever's currently effective for this
    // brand — its own override if one exists, else the inherited Base token.
    const referenceToken = override ?? baseToken
    const derived = deriveTypographyValue(
      idSet,
      figmaMeta,
      brandModeId,
      typographySubIndex,
      fontFamilyIndex,
      fontWeightIndex,
      referenceToken.resolvedValue as LocalTypographyValue,
      referenceToken.rawValue as LocalTypographyValue,
      () => unitForTypographyFontSize(referenceToken),
    )
    if (derived.kind === 'unsupported') {
      skipped.push({
        variableId: idSet.fontFamily,
        name: `${baseToken.path.join('/')} (typography)`,
        reason: derived.reason,
      })
      continue
    }

    const figmaSnapshot: DtcgSnapshot =
      derived.kind === 'alias'
        ? { type: 'typography', referenceTarget: derived.referenceTarget, rawValue: undefined }
        : { type: 'typography', referenceTarget: null, rawValue: derived.rawValue }

    const inheritedSnapshot = snapshotOf(baseToken)
    const originalSnapshot = override ? snapshotOf(override) : inheritedSnapshot
    if (snapshotEqual(figmaSnapshot, originalSnapshot)) continue

    const workingEntry = brandWorkingByPath.get(path)
    const workingSnapshot = workingEntry ? snapshotOf(workingEntry.token) : originalSnapshot
    const workingHasManualEdit = !snapshotEqual(workingSnapshot, originalSnapshot)

    if (workingHasManualEdit) {
      if (snapshotEqual(workingSnapshot, figmaSnapshot)) continue
      // Same "not modeled as a resolvable PullConflict" policy as deriveShadowPullEntries's own
      // conflict handling — a partially-diverged multi-variable composite doesn't cleanly fit
      // PullConflict's single resolvable-value shape.
      skipped.push({
        variableId: idSet.fontFamily,
        name: `${baseToken.path.join('/')} (typography)`,
        reason: 'Figma and a pending local edit disagree — resolve manually.',
      })
      continue
    }

    if (!override) {
      creates.push(entryFrom('create', baseToken.layer, baseToken.path, idSet, figmaSnapshot))
    } else if (snapshotEqual(figmaSnapshot, inheritedSnapshot)) {
      deletes.push(entryFrom('delete', baseToken.layer, baseToken.path, idSet, figmaSnapshot))
    } else {
      updates.push(entryFrom('update', baseToken.layer, baseToken.path, idSet, figmaSnapshot))
    }
  }

  return { creates, updates, deletes, skipped }
}

/**
 * Brand plan: for every Figma variable that already matches a *Base* token
 * (brand-new Figma variables are Base-only creates — see module comment —
 * and never trigger a brand override in the same pull), compares that
 * variable's brand-mode value against the brand's own sparse override (if
 * one exists) or, absent one, the value it currently inherits from Base.
 * - Inherited, Figma's brand value now differs from the inherited value ->
 *   `create` (a new override).
 * - Overridden, Figma's brand value differs from the override -> `update`.
 * - Overridden, Figma's brand value now matches the inherited Base value
 *   again -> `delete` (the override is no longer needed).
 * Conflict detection mirrors the Base plan, scoped to the brand's own
 * working tree.
 */
export function buildBrandPullPlan(params: {
  baseOriginal: FlatToken[]
  brandOriginal: FlatToken[]
  brandWorking: WorkingToken[]
  figmaMeta: FigmaVariablesMeta
  brandModeId: string
}): PullPlan {
  const { baseOriginal, brandOriginal, brandWorking, figmaMeta, brandModeId } = params
  const plan = emptyPlan()

  // Shadow tokens excluded — see buildBasePullPlan's baseIndex comment.
  // Shadow sync is Base-only anyway (docs/plans/shadow-token-type-plan.md),
  // so brand-mode values for a shadow's sub-variables are never read here.
  const baseIndex = new Map(
    baseOriginal
      .filter((t): t is FlatToken & { figmaId: string } => typeof t.figmaId === 'string')
      .map(t => [t.figmaId, t]),
  )
  const baseByPath = new Map(baseOriginal.map(t => [t.path.join('.'), t]))
  const brandOriginalByPath = new Map(brandOriginal.map(t => [t.path.join('.'), t]))
  const brandWorkingByPath = new Map(brandWorking.map(w => [w.token.path.join('.'), w]))
  const shadowSubVariableIds = new Set(
    baseOriginal.flatMap(t => (isShadowFigmaId(t.figmaId) ? Object.values(t.figmaId) : [])),
  )
  // Typography *does* support brand-level pull (decision 8), unlike shadow — but still excluded
  // from this generic single-variable loop, matched separately by
  // deriveBrandTypographyPullEntries below (same "one token, several sub-variables" reasoning as
  // shadow's exclusion above).
  const typographySubVariableIds = new Set(
    baseOriginal.flatMap(t => (isTypographyFigmaId(t.figmaId) ? Object.values(t.figmaId) : [])),
  )
  // Same exclusion, for responsive dimension's 3-sub-id set — matched separately by
  // deriveBrandResponsiveDimensionPullEntries below.
  const responsiveDimensionSubVariableIds = new Set(
    baseOriginal.flatMap(t => (isResponsiveDimensionFigmaId(t.figmaId) ? Object.values(t.figmaId) : [])),
  )

  for (const variable of Object.values(figmaMeta.variables)) {
    if (
      shadowSubVariableIds.has(variable.id) ||
      typographySubVariableIds.has(variable.id) ||
      responsiveDimensionSubVariableIds.has(variable.id)
    )
      continue
    const modeValue = variable.valuesByMode[brandModeId]
    if (modeValue === undefined) continue

    const matched = baseIndex.get(variable.id)
    if (!matched) continue // brand-new variable — Base create only, see doc comment

    const path = matched.path.join('.')
    const override = brandOriginalByPath.get(path)

    // The reference for type/merge purposes is whatever's currently
    // effective for this brand — its own override if one exists, else the
    // inherited Base token. Matters for fontFamily: the array to preserve
    // fallbacks from should be the brand's own, not always Base's.
    const derived = deriveValue(variable, modeValue, baseIndex, override ?? matched)
    if (derived.kind === 'unsupported') {
      plan.skipped.push({ variableId: variable.id, name: variable.name, reason: derived.reason })
      continue
    }
    const figmaSnapshot = derivedSnapshot(derived)
    const inheritedSnapshot = snapshotOf(matched)
    const originalSnapshot = override ? snapshotOf(override) : inheritedSnapshot

    if (snapshotEqual(figmaSnapshot, originalSnapshot)) continue

    const workingEntry = brandWorkingByPath.get(path)
    const workingSnapshot = workingEntry ? snapshotOf(workingEntry.token) : originalSnapshot
    const workingHasManualEdit = !snapshotEqual(workingSnapshot, originalSnapshot)

    if (workingHasManualEdit) {
      if (snapshotEqual(workingSnapshot, figmaSnapshot)) continue
      plan.conflicts.push({
        tokenId: workingEntry!.id,
        path: matched.path,
        layer: matched.layer,
        figmaId: variable.id,
        workingValue: snapshotToEffectiveValue(workingSnapshot),
        figmaValue: snapshotToEffectiveValue(figmaSnapshot),
        figma: {
          type: figmaSnapshot.type,
          rawValue: figmaSnapshot.rawValue,
          referenceTarget: figmaSnapshot.referenceTarget,
        },
      })
      continue
    }

    if (!override) {
      plan.creates.push(entryFrom('create', matched.layer, matched.path, variable.id, figmaSnapshot))
    } else if (snapshotEqual(figmaSnapshot, inheritedSnapshot)) {
      plan.deletes.push(entryFrom('delete', matched.layer, matched.path, variable.id, figmaSnapshot))
    } else {
      plan.updates.push(entryFrom('update', matched.layer, matched.path, variable.id, figmaSnapshot))
    }
  }

  // A brand override whose Base token's Figma variable has been removed
  // entirely (the Base plan will propose deleting it) would otherwise be
  // left dangling — clean it up in the same pull rather than leaving an
  // override pointing at a token that's about to disappear.
  for (const token of brandOriginal) {
    const path = token.path.join('.')
    const baseToken = baseByPath.get(path)
    // Shadow sync is Base-only (see docs/plans/shadow-token-type-plan.md) —
    // a shadow token's figmaId is also 5 sub-ids, not 1, so it wouldn't fit
    // entryFrom's single-id shape here regardless.
    if (typeof baseToken?.figmaId !== 'string' || figmaMeta.variables[baseToken.figmaId]) continue
    if (!brandWorkingByPath.has(path)) continue // working already deleted it
    plan.deletes.push(entryFrom('delete', token.layer, token.path, baseToken.figmaId, snapshotOf(token)))
  }

  const typographyEntries = deriveBrandTypographyPullEntries({
    baseOriginal,
    brandOriginal,
    brandWorking,
    figmaMeta,
    brandModeId,
  })
  plan.creates.push(...typographyEntries.creates)
  plan.updates.push(...typographyEntries.updates)
  plan.deletes.push(...typographyEntries.deletes)
  plan.skipped.push(...typographyEntries.skipped)

  const responsiveDimensionEntries = deriveBrandResponsiveDimensionPullEntries({
    baseOriginal,
    brandOriginal,
    brandWorking,
    figmaMeta,
    brandModeId,
  })
  plan.creates.push(...responsiveDimensionEntries.creates)
  plan.updates.push(...responsiveDimensionEntries.updates)
  plan.deletes.push(...responsiveDimensionEntries.deletes)
  plan.skipped.push(...responsiveDimensionEntries.skipped)

  return plan
}

export function buildFigmaPullPlan(params: {
  original: FlatToken[]
  working: WorkingToken[]
  brandNames: string[]
  brandOriginal: Record<string, FlatToken[]>
  brandWorking: Record<string, WorkingToken[]>
  figmaMeta: FigmaVariablesMeta
}): FigmaPullResult {
  const { original, working, brandNames, brandOriginal, brandWorking, figmaMeta } = params
  const { modeIdByBrand } = findCollectionAndModes(figmaMeta, brandNames)

  const base = buildBasePullPlan({ original, working, figmaMeta, baseModeId: modeIdByBrand.Base })

  const brands: Record<string, PullPlan> = {}
  for (const brand of brandNames) {
    brands[brand] = buildBrandPullPlan({
      baseOriginal: original,
      brandOriginal: brandOriginal[brand] ?? [],
      brandWorking: brandWorking[brand] ?? [],
      figmaMeta,
      brandModeId: modeIdByBrand[brand],
    })
  }

  return { base, brands }
}

// Selection is per-(scope, path) rather than per-PulledEntry — a scope is
// 'base' or a brand name, since the same path can independently need
// applying (or not) in Base and in each brand's own plan.
export function pullEntryKey(scope: string, path: string[]): string {
  return `${scope}::${path.join('.')}`
}

export function allPullEntryKeys(result: FigmaPullResult): Set<string> {
  const keys = new Set<string>()
  for (const entry of [...result.base.creates, ...result.base.updates, ...result.base.deletes]) {
    keys.add(pullEntryKey('base', entry.path))
  }
  for (const [brand, plan] of Object.entries(result.brands)) {
    for (const entry of [...plan.creates, ...plan.updates, ...plan.deletes]) {
      keys.add(pullEntryKey(brand, entry.path))
    }
  }
  return keys
}

// Conflicts/skipped always pass through untouched — only creates/updates/
// deletes are subject to the user's checkbox selection (a conflict isn't
// something you "apply", it needs explicit resolution either way).
export function filterPlanBySelection(scope: string, plan: PullPlan, selection: Set<string>): PullPlan {
  return {
    creates: plan.creates.filter(e => selection.has(pullEntryKey(scope, e.path))),
    updates: plan.updates.filter(e => selection.has(pullEntryKey(scope, e.path))),
    deletes: plan.deletes.filter(e => selection.has(pullEntryKey(scope, e.path))),
    conflicts: plan.conflicts,
    skipped: plan.skipped,
  }
}
