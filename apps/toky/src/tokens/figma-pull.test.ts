import { describe, expect, it } from 'vitest'
import type { WorkingToken } from './edit'
import type { FigmaVariable, FigmaVariablesMeta } from './figma'
import {
  allPullEntryKeys,
  buildBasePullPlan,
  buildBrandPullPlan,
  buildFigmaPullPlan,
  filterPlanBySelection,
  findCollectionAndModes,
  pullEntryKey,
} from './figma-pull'
import type { FlatToken } from './types'

const BASE_MODE = '1:0'
const TCS_MODE = '1:1'

function collection(brandNames: string[] = []): FigmaVariablesMeta['variableCollections'] {
  return {
    'VariableCollectionId:1': {
      id: 'VariableCollectionId:1',
      name: 'Tokens',
      modes: [{ modeId: BASE_MODE, name: 'Base' }, ...brandNames.map((name, i) => ({ modeId: `1:${i + 1}`, name }))],
      defaultModeId: BASE_MODE,
    },
  }
}

function variable(partial: Partial<FigmaVariable> & Pick<FigmaVariable, 'id' | 'name'>): FigmaVariable {
  return {
    variableCollectionId: 'VariableCollectionId:1',
    resolvedType: 'COLOR',
    valuesByMode: {},
    scopes: [],
    ...partial,
  }
}

function meta(variables: FigmaVariable[], brandNames: string[] = []): FigmaVariablesMeta {
  return {
    variables: Object.fromEntries(variables.map(v => [v.id, v])),
    variableCollections: collection(brandNames),
  }
}

function token(partial: Partial<FlatToken> & Pick<FlatToken, 'path'>): FlatToken {
  return {
    name: partial.path.slice(1).join('.'),
    layer: 'Global',
    type: 'color',
    rawValue: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' },
    referenceTarget: null,
    resolvedValue: undefined,
    resolutionError: null,
    figmaId: null,
    ...partial,
  }
}

function working(t: FlatToken): WorkingToken {
  return { id: t.path.join('.'), token: t }
}

const white = token({
  path: ['🌐 Global', '🌈 Color', 'White'],
  figmaId: 'VariableID:1',
  rawValue: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' },
})

describe('findCollectionAndModes', () => {
  it('resolves Base + brand mode ids', () => {
    const result = findCollectionAndModes(meta([], ['Tcs']), ['Tcs'])
    expect(result.modeIdByBrand).toEqual({ Base: BASE_MODE, Tcs: TCS_MODE })
  })

  it('throws when there is not exactly one collection', () => {
    const emptyMeta: FigmaVariablesMeta = { variables: {}, variableCollections: {} }
    expect(() => findCollectionAndModes(emptyMeta, [])).toThrow(/exactly one/)
  })

  it('throws when a brand has no matching mode', () => {
    expect(() => findCollectionAndModes(meta([], []), ['Tcs'])).toThrow(/No Figma mode named "Tcs"/)
  })
})

describe('buildBasePullPlan', () => {
  it('proposes a create for an unmatched variable under a known layer', () => {
    const v = variable({
      id: 'VariableID:2',
      name: '🌐 Global/🌈 Color/Black',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({ original: [], working: [], figmaMeta: meta([v]), baseModeId: BASE_MODE })
    expect(plan.creates).toHaveLength(1)
    expect(plan.creates[0]).toMatchObject({ kind: 'create', path: ['🌐 Global', '🌈 Color', 'Black'], type: 'color' })
  })

  it('adopts an existing unlinked token at the same path instead of proposing a duplicate create', () => {
    // Same name/path as the Figma variable, no figmaId — e.g. a token whose
    // link was dropped on write by the applyDiffToDocument bug (see edit.ts),
    // or one created by hand before ever pulling.
    const darkFigma = token({
      path: ['🌐 Global', '🌈 Color', 'DarkFigma'],
      figmaId: null,
      rawValue: { colorSpace: 'srgb', components: [0.5784254670143127, 0, 0], alpha: 1, hex: '#930000' },
    })
    const v = variable({
      id: 'VariableID:9:9',
      name: '🌐 Global/🌈 Color/DarkFigma',
      valuesByMode: { [BASE_MODE]: { r: 0.5784254670143127, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [darkFigma],
      working: [working(darkFigma)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.creates).toHaveLength(0)
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0]).toMatchObject({ kind: 'update', path: darkFigma.path, figmaId: 'VariableID:9:9' })
  })

  it('adopts and updates the value in one pass when the unlinked token also changed', () => {
    const darkFigma = token({ path: ['🌐 Global', '🌈 Color', 'DarkFigma'], figmaId: null })
    const v = variable({
      id: 'VariableID:9:9',
      name: '🌐 Global/🌈 Color/DarkFigma',
      valuesByMode: { [BASE_MODE]: { r: 0.5784254670143127, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [darkFigma],
      working: [working(darkFigma)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].figmaId).toBe('VariableID:9:9')
    expect((plan.updates[0].rawValue as { hex: string }).hex).toBe('#930000')
  })

  it('does not adopt a same-path token that already has a different figmaId', () => {
    const darkFigma = token({ path: ['🌐 Global', '🌈 Color', 'DarkFigma'], figmaId: 'VariableID:other' })
    const v = variable({
      id: 'VariableID:9:9',
      name: '🌐 Global/🌈 Color/DarkFigma',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [darkFigma],
      working: [working(darkFigma)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    // The existing token is already linked to a *different* variable, so
    // this Figma variable is a genuinely separate, new token.
    expect(plan.creates).toHaveLength(1)
  })

  it('does not re-propose an adoption already staged in working but not yet submitted', () => {
    // `original` still has no figmaId (nothing's been submitted to GitHub
    // yet) but `working` already carries the backfilled link from a prior
    // pull's Apply — re-pulling in the meantime must not show it again.
    const darkFigmaOriginal = token({ path: ['🌐 Global', '🌈 Color', 'DarkFigma'], figmaId: null })
    const darkFigmaWorking = token({ path: ['🌐 Global', '🌈 Color', 'DarkFigma'], figmaId: 'VariableID:9:9' })
    const v = variable({
      id: 'VariableID:9:9',
      name: '🌐 Global/🌈 Color/DarkFigma',
      valuesByMode: { [BASE_MODE]: { r: 1, g: 1, b: 1, a: 1 } }, // matches token()'s default white
    })
    const plan = buildBasePullPlan({
      original: [darkFigmaOriginal],
      working: [working(darkFigmaWorking)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.creates).toHaveLength(0)
    expect(plan.updates).toHaveLength(0)
    expect(plan.conflicts).toHaveLength(0)
  })

  it('still proposes a further update when Figma changed again after an unsubmitted adoption', () => {
    const darkFigmaOriginal = token({ path: ['🌐 Global', '🌈 Color', 'DarkFigma'], figmaId: null })
    const darkFigmaWorking = token({ path: ['🌐 Global', '🌈 Color', 'DarkFigma'], figmaId: 'VariableID:9:9' })
    const v = variable({
      id: 'VariableID:9:9',
      name: '🌐 Global/🌈 Color/DarkFigma',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } }, // changed since the adoption
    })
    const plan = buildBasePullPlan({
      original: [darkFigmaOriginal],
      working: [working(darkFigmaWorking)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.creates).toHaveLength(0)
    expect(plan.updates).toHaveLength(1)
    expect((plan.updates[0].rawValue as { hex: string }).hex).toBe('#000000')
  })

  it('does not re-propose a genuinely new token already staged as a create in working but not yet submitted', () => {
    // Unlike the adopt case, `original` has no entry at this path at all —
    // it's a brand-new token that only exists in `working` because a prior
    // pull's `create` was already Applied.
    const stagedCreate = token({
      path: ['🌐 Global', '🌈 Color', 'DarkFigmaSecond'],
      figmaId: 'VariableID:83:3',
      rawValue: { colorSpace: 'srgb', components: [0.5784254670143127, 0, 0], alpha: 1, hex: '#930000' },
    })
    const v = variable({
      id: 'VariableID:83:3',
      name: '🌐 Global/🌈 Color/DarkFigmaSecond',
      valuesByMode: { [BASE_MODE]: { r: 0.5784254670143127, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [],
      working: [working(stagedCreate)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.creates).toHaveLength(0)
    expect(plan.updates).toHaveLength(0)
  })

  it('proposes an update (not another create) when Figma changed further after a staged, unsubmitted create', () => {
    const stagedCreate = token({ path: ['🌐 Global', '🌈 Color', 'DarkFigmaSecond'], figmaId: 'VariableID:83:3' })
    const v = variable({
      id: 'VariableID:83:3',
      name: '🌐 Global/🌈 Color/DarkFigmaSecond',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } }, // changed since the create was staged
    })
    const plan = buildBasePullPlan({
      original: [],
      working: [working(stagedCreate)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.creates).toHaveLength(0)
    expect(plan.updates).toHaveLength(1)
    expect((plan.updates[0].rawValue as { hex: string }).hex).toBe('#000000')
  })

  it('skips an unmatched variable whose name has no recognized layer prefix', () => {
    const v = variable({
      id: 'VariableID:2',
      name: 'Unrelated/Color/Black',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({ original: [], working: [], figmaMeta: meta([v]), baseModeId: BASE_MODE })
    expect(plan.creates).toHaveLength(0)
    expect(plan.skipped).toHaveLength(1)
    expect(plan.skipped[0].reason).toMatch(/not a recognized layer/)
  })

  it('skips a variable with an unsupported resolvedType', () => {
    const v = variable({
      id: 'VariableID:9',
      name: '🌐 Global/Effect/Shadow',
      resolvedType: 'EFFECT',
      valuesByMode: { [BASE_MODE]: {} },
    })
    const plan = buildBasePullPlan({ original: [], working: [], figmaMeta: meta([v]), baseModeId: BASE_MODE })
    expect(plan.skipped).toHaveLength(1)
    expect(plan.skipped[0].reason).toMatch(/Unsupported Figma type/)
  })

  it('is a no-op when the matched variable is unchanged', () => {
    const v = variable({ id: white.figmaId!, name: 'x', valuesByMode: { [BASE_MODE]: { r: 1, g: 1, b: 1, a: 1 } } })
    const plan = buildBasePullPlan({
      original: [white],
      working: [working(white)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.conflicts).toHaveLength(0)
  })

  it('is a no-op when floating point drift keeps the color within hex tolerance', () => {
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { r: 1, g: 1, b: 0.9999999, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [white],
      working: [working(white)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
  })

  it('proposes a clean update when Figma changed and working matches original', () => {
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [white],
      working: [working(white)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect((plan.updates[0].rawValue as { hex: string }).hex).toBe('#000000')
    expect(plan.conflicts).toHaveLength(0)
  })

  it('proposes an update for a changed alias', () => {
    const black = token({ path: ['🌐 Global', '🌈 Color', 'Black'], figmaId: 'VariableID:2' })
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { type: 'VARIABLE_ALIAS', id: 'VariableID:2' } },
    })
    const plan = buildBasePullPlan({
      original: [white, black],
      working: [working(white), working(black)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].referenceTarget).toBe('🌐 Global.🌈 Color.Black')
  })

  it('flags a conflict when working diverged from original and disagrees with Figma', () => {
    const editedWhite = {
      ...white,
      rawValue: { colorSpace: 'srgb', components: [0.5, 0.5, 0.5], alpha: 1, hex: '#808080' },
    }
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [white],
      working: [working(editedWhite)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.conflicts).toHaveLength(1)
    expect(plan.conflicts[0].path).toEqual(white.path)
  })

  it('is a no-op (not a conflict) when the manual edit already matches Figma', () => {
    const editedWhite = { ...white, rawValue: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' } }
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBasePullPlan({
      original: [white],
      working: [working(editedWhite)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.conflicts).toHaveLength(0)
  })

  it('proposes a delete when a token’s variableId is no longer in Figma', () => {
    const plan = buildBasePullPlan({
      original: [white],
      working: [working(white)],
      figmaMeta: meta([]),
      baseModeId: BASE_MODE,
    })
    expect(plan.deletes).toHaveLength(1)
    expect(plan.deletes[0].path).toEqual(white.path)
  })

  it('does not re-propose a delete for a token already removed from working', () => {
    const plan = buildBasePullPlan({ original: [white], working: [], figmaMeta: meta([]), baseModeId: BASE_MODE })
    expect(plan.deletes).toHaveLength(0)
  })
})

describe('buildBrandPullPlan', () => {
  it('never creates a brand override for a variable with no matching Base token', () => {
    const v = variable({
      id: 'VariableID:99',
      name: '🌐 Global/🌈 Color/New',
      valuesByMode: { [TCS_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBrandPullPlan({
      baseOriginal: [],
      brandOriginal: [],
      brandWorking: [],
      figmaMeta: meta([v], ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.creates).toHaveLength(0)
  })

  it('proposes a new override when the brand mode diverges from the inherited Base value', () => {
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [TCS_MODE]: { r: 0, g: 0, b: 0, a: 1 } },
    })
    const plan = buildBrandPullPlan({
      baseOriginal: [white],
      brandOriginal: [],
      brandWorking: [],
      figmaMeta: meta([v], ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.creates).toHaveLength(1)
  })

  it('proposes deleting an override once the brand mode reconverges with Base', () => {
    const override = token({
      path: white.path,
      rawValue: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
    })
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [TCS_MODE]: { r: 1, g: 1, b: 1, a: 1 } }, // back to white, same as Base
    })
    const plan = buildBrandPullPlan({
      baseOriginal: [white],
      brandOriginal: [override],
      brandWorking: [working(override)],
      figmaMeta: meta([v], ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.deletes).toHaveLength(1)
  })

  it('cleans up a dangling override when the underlying Base variable is removed', () => {
    const override = token({
      path: white.path,
      rawValue: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
    })
    const plan = buildBrandPullPlan({
      baseOriginal: [white],
      brandOriginal: [override],
      brandWorking: [working(override)],
      figmaMeta: meta([], ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.deletes).toHaveLength(1)
  })
})

describe('buildFigmaPullPlan', () => {
  it('combines a Base plan with per-brand plans', () => {
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 }, [TCS_MODE]: { r: 1, g: 0, b: 0, a: 1 } },
    })
    const result = buildFigmaPullPlan({
      original: [white],
      working: [working(white)],
      brandNames: ['Tcs'],
      brandOriginal: { Tcs: [] },
      brandWorking: { Tcs: [] },
      figmaMeta: meta([v], ['Tcs']),
    })
    expect(result.base.updates).toHaveLength(1)
    expect(result.brands.Tcs.creates).toHaveLength(1)
  })
})

describe('allPullEntryKeys / filterPlanBySelection', () => {
  it('collects one key per create/update/delete across base and brands, scoped separately', () => {
    const v = variable({
      id: white.figmaId!,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { r: 0, g: 0, b: 0, a: 1 }, [TCS_MODE]: { r: 1, g: 0, b: 0, a: 1 } },
    })
    const result = buildFigmaPullPlan({
      original: [white],
      working: [working(white)],
      brandNames: ['Tcs'],
      brandOriginal: { Tcs: [] },
      brandWorking: { Tcs: [] },
      figmaMeta: meta([v], ['Tcs']),
    })
    const keys = allPullEntryKeys(result)
    expect(keys).toEqual(new Set([pullEntryKey('base', white.path), pullEntryKey('Tcs', white.path)]))
  })

  it('filters a plan down to only the selected entries, leaving conflicts/skipped untouched', () => {
    const kept = token({ path: ['🌐 Global', '🌈 Color', 'Kept'], figmaId: 'VariableID:kept' })
    const dropped = token({ path: ['🌐 Global', '🌈 Color', 'Dropped'], figmaId: 'VariableID:dropped' })
    const plan = {
      creates: [],
      updates: [
        {
          kind: 'update' as const,
          layer: 'Global' as const,
          path: kept.path,
          figmaId: 'a',
          type: 'color',
          rawValue: {},
          referenceTarget: null,
        },
        {
          kind: 'update' as const,
          layer: 'Global' as const,
          path: dropped.path,
          figmaId: 'b',
          type: 'color',
          rawValue: {},
          referenceTarget: null,
        },
      ],
      deletes: [],
      conflicts: [
        {
          tokenId: 'x',
          path: ['x'],
          layer: 'Global' as const,
          figmaId: 'c',
          workingValue: 1,
          figmaValue: 2,
          figma: { type: 'number', rawValue: 2, referenceTarget: null },
        },
      ],
      skipped: [{ variableId: 'd', name: 'skip-me', reason: 'nope' }],
    }
    const selection = new Set([pullEntryKey('base', kept.path)])
    const filtered = filterPlanBySelection('base', plan, selection)
    expect(filtered.updates).toHaveLength(1)
    expect(filtered.updates[0].path).toEqual(kept.path)
    expect(filtered.conflicts).toEqual(plan.conflicts)
    expect(filtered.skipped).toEqual(plan.skipped)
  })
})
