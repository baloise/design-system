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
  dtcgColorFromFigma,
  dtcgShadowLayerFromFigma,
  dtcgTypeFor,
  fontWeightNumberFromKeyword,
  isFigmaAlias,
  isLiteralValueEqual,
  isShadowFigmaId,
  pathFromFigmaVariableName,
  SHADOW_SUB_PROPERTIES,
} from './figma-map'
import type { ShadowSubProperty } from './figma-map'
import type { FigmaId, FlatToken, TokenLayer } from './types'

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

  for (const variable of Object.values(figmaMeta.variables)) {
    if (shadowSubVariableIds.has(variable.id)) continue
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

  return plan
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

  for (const variable of Object.values(figmaMeta.variables)) {
    if (shadowSubVariableIds.has(variable.id)) continue
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
