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
  dtcgTypeFor,
  isFigmaAlias,
  isLiteralValueEqual,
  pathFromFigmaVariableName,
} from './figma-map'
import type { FlatToken, TokenLayer } from './types'

export interface PulledEntry {
  kind: 'create' | 'update' | 'delete'
  layer: TokenLayer
  path: string[]
  figmaId: string
  type: string
  rawValue: unknown
  referenceTarget: string | null
}

export interface PullConflict {
  tokenId: string
  path: string[]
  layer: TokenLayer
  figmaId: string
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
function deriveValue(variable: FigmaVariable, modeValue: unknown, baseIndex: Map<string, FlatToken>): DerivedValue {
  let dtcgType: string
  try {
    dtcgType = dtcgTypeFor(variable.resolvedType)
  } catch {
    return { kind: 'unsupported', reason: `Unsupported Figma type "${variable.resolvedType}" — skipped.` }
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
  figmaId: string,
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

  const baseIndex = new Map(original.filter(t => t.figmaId).map(t => [t.figmaId as string, t]))
  const originalByPath = new Map(original.map(t => [t.path.join('.'), t]))
  const workingByPath = new Map(working.map(w => [w.token.path.join('.'), w]))
  // Anything already linked to a Figma variable in `working` but not yet in
  // `original` — a create or an adopted-update from an earlier pull that's
  // been Applied but not yet Submitted. `original` (and baseIndex) won't
  // reflect it until a submit lands, so without this a not-yet-submitted
  // pull's result gets proposed again on every subsequent pull.
  const workingFigmaIndex = new Map(working.filter(w => w.token.figmaId).map(w => [w.token.figmaId as string, w]))

  for (const variable of Object.values(figmaMeta.variables)) {
    const modeValue = variable.valuesByMode[baseModeId]
    if (modeValue === undefined) continue

    const derived = deriveValue(variable, modeValue, baseIndex)
    if (derived.kind === 'unsupported') {
      plan.skipped.push({ variableId: variable.id, name: variable.name, reason: derived.reason })
      continue
    }
    const figmaSnapshot = derivedSnapshot(derived)

    const matched = baseIndex.get(variable.id)

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
    if (!token.figmaId || figmaMeta.variables[token.figmaId]) continue
    const path = token.path.join('.')
    if (!workingByPath.has(path)) continue // working already deleted it — nothing new to propose
    plan.deletes.push(entryFrom('delete', token.layer, token.path, token.figmaId, snapshotOf(token)))
  }

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

  const baseIndex = new Map(baseOriginal.filter(t => t.figmaId).map(t => [t.figmaId as string, t]))
  const baseByPath = new Map(baseOriginal.map(t => [t.path.join('.'), t]))
  const brandOriginalByPath = new Map(brandOriginal.map(t => [t.path.join('.'), t]))
  const brandWorkingByPath = new Map(brandWorking.map(w => [w.token.path.join('.'), w]))

  for (const variable of Object.values(figmaMeta.variables)) {
    const modeValue = variable.valuesByMode[brandModeId]
    if (modeValue === undefined) continue

    const matched = baseIndex.get(variable.id)
    if (!matched) continue // brand-new variable — Base create only, see doc comment

    const derived = deriveValue(variable, modeValue, baseIndex)
    if (derived.kind === 'unsupported') {
      plan.skipped.push({ variableId: variable.id, name: variable.name, reason: derived.reason })
      continue
    }
    const figmaSnapshot = derivedSnapshot(derived)

    const path = matched.path.join('.')
    const override = brandOriginalByPath.get(path)
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
    if (!baseToken?.figmaId || figmaMeta.variables[baseToken.figmaId]) continue
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
