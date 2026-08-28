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
    responsive: null,
    resolvedResponsive: null,
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
    const v = variable({
      id: white.figmaId as string,
      name: 'x',
      valuesByMode: { [BASE_MODE]: { r: 1, g: 1, b: 1, a: 1 } },
    })
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
      id: white.figmaId as string,
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
      id: white.figmaId as string,
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

  it('does not perpetually flag a matched fontWeight token as changed when Figma holds its own current keyword', () => {
    // Regression: deriveValue used to guess $type purely from Figma's
    // resolvedType (STRING -> 'string'), which never matched the local
    // token's 'fontWeight' — so this would show as a false-positive update
    // on every single pull, forever, even with nothing actually changed.
    const bold = token({
      path: ['🌐 Global', '🔤 Font', 'Weight', '700'],
      type: 'fontWeight',
      rawValue: 700,
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: bold.figmaId as string,
      name: 'x',
      resolvedType: 'STRING',
      valuesByMode: { [BASE_MODE]: 'Bold' },
    })
    const plan = buildBasePullPlan({
      original: [bold],
      working: [working(bold)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.conflicts).toHaveLength(0)
  })

  it("converts a matched fontWeight token's new Figma keyword back to its DTCG number on update", () => {
    const light = token({
      path: ['🌐 Global', '🔤 Font', 'Weight', '300'],
      type: 'fontWeight',
      rawValue: 300,
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: light.figmaId as string,
      name: 'x',
      resolvedType: 'STRING',
      valuesByMode: { [BASE_MODE]: 'Bold' },
    })
    const plan = buildBasePullPlan({
      original: [light],
      working: [working(light)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].type).toBe('fontWeight')
    expect(plan.updates[0].rawValue).toBe(700)
  })

  it('skips a matched fontWeight variable whose Figma value is not a known DTCG keyword', () => {
    const bold = token({
      path: ['🌐 Global', '🔤 Font', 'Weight', '700'],
      type: 'fontWeight',
      rawValue: 700,
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: bold.figmaId as string,
      name: 'x',
      resolvedType: 'STRING',
      valuesByMode: { [BASE_MODE]: 'SemiBold' },
    })
    const plan = buildBasePullPlan({
      original: [bold],
      working: [working(bold)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.skipped).toHaveLength(1)
    expect(plan.skipped[0].reason).toMatch(/doesn't match a known DTCG keyword/)
  })

  it('does not perpetually flag a matched fontFamily token as changed when Figma holds its current primary font', () => {
    // Same regression shape as fontWeight above: deriveValue must trust the
    // matched token's own $type instead of guessing 'string' from Figma's
    // STRING resolvedType.
    const heading = token({
      path: ['🌐 Global', '🔤 Font', 'Family', 'Heading'],
      type: 'fontFamily',
      rawValue: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: heading.figmaId as string,
      name: 'x',
      resolvedType: 'STRING',
      valuesByMode: { [BASE_MODE]: 'BaloiseCreateHeadline' },
    })
    const plan = buildBasePullPlan({
      original: [heading],
      working: [working(heading)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.conflicts).toHaveLength(0)
  })

  it("replaces only index 0 of a matched fontFamily token's array, preserving the rest of the fallback stack", () => {
    const heading = token({
      path: ['🌐 Global', '🔤 Font', 'Family', 'Heading'],
      type: 'fontFamily',
      rawValue: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: heading.figmaId as string,
      name: 'x',
      resolvedType: 'STRING',
      valuesByMode: { [BASE_MODE]: 'Roboto' },
    })
    const plan = buildBasePullPlan({
      original: [heading],
      working: [working(heading)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].type).toBe('fontFamily')
    expect(plan.updates[0].rawValue).toEqual(['Roboto', 'Arial', 'sans-serif'])
  })

  it('does not perpetually flag a matched rem-unit dimension token as changed when Figma holds the equivalent px', () => {
    // Same regression shape as fontWeight/fontFamily above: deriveValue must
    // trust the matched token's own $type instead of guessing 'number' from
    // Figma's FLOAT resolvedType.
    const space24 = token({
      path: ['🌐 Global', '📏 Size', 'Space', '24'],
      type: 'dimension',
      rawValue: { value: 1.5, unit: 'rem' },
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: space24.figmaId as string,
      name: 'x',
      resolvedType: 'FLOAT',
      valuesByMode: { [BASE_MODE]: 24 },
    })
    const plan = buildBasePullPlan({
      original: [space24],
      working: [working(space24)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.conflicts).toHaveLength(0)
  })

  it("converts a matched rem-unit dimension token's new Figma px value back to rem on update", () => {
    const space24 = token({
      path: ['🌐 Global', '📏 Size', 'Space', '24'],
      type: 'dimension',
      rawValue: { value: 1.5, unit: 'rem' },
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: space24.figmaId as string,
      name: 'x',
      resolvedType: 'FLOAT',
      valuesByMode: { [BASE_MODE]: 40 },
    })
    const plan = buildBasePullPlan({
      original: [space24],
      working: [working(space24)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].type).toBe('dimension')
    expect(plan.updates[0].rawValue).toEqual({ value: 2.5, unit: 'rem' })
  })

  it('passes a matched px-unit dimension token through unconverted', () => {
    const breakpoint = token({
      path: ['🌐 Global', '📏 Size', 'Breakpoint', '1'],
      type: 'dimension',
      rawValue: { value: 769, unit: 'px' },
      figmaId: 'VariableID:9',
    })
    const v = variable({
      id: breakpoint.figmaId as string,
      name: 'x',
      resolvedType: 'FLOAT',
      valuesByMode: { [BASE_MODE]: 800 },
    })
    const plan = buildBasePullPlan({
      original: [breakpoint],
      working: [working(breakpoint)],
      figmaMeta: meta([v]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].rawValue).toEqual({ value: 800, unit: 'px' })
  })

  it('proposes an update for a changed alias', () => {
    const black = token({ path: ['🌐 Global', '🌈 Color', 'Black'], figmaId: 'VariableID:2' })
    const v = variable({
      id: white.figmaId as string,
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
      id: white.figmaId as string,
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
      id: white.figmaId as string,
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

describe('buildBasePullPlan — shadow', () => {
  const shadowFigmaId = {
    offsetX: 'VariableID:shadow:offsetX',
    offsetY: 'VariableID:shadow:offsetY',
    blur: 'VariableID:shadow:blur',
    spread: 'VariableID:shadow:spread',
    color: 'VariableID:shadow:color',
  }

  const shadow = token({
    path: ['🌐 Global', '🌑 Shadow', 'Elevation1'],
    type: 'shadow',
    figmaId: shadowFigmaId,
    rawValue: {
      offsetX: { value: 0, unit: 'rem' },
      offsetY: { value: 0.125, unit: 'rem' }, // 2px
      blur: { value: 0.3125, unit: 'rem' }, // 5px
      spread: { value: 0.0625, unit: 'rem' }, // 1px
      color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 0.12, hex: '#000000' },
    },
  })

  function shadowVariables(overrides?: {
    offsetX?: number
    offsetY?: number
    blur?: number
    spread?: number
    color?: { r: number; g: number; b: number; a: number }
  }): FigmaVariable[] {
    const px = { offsetX: 0, offsetY: 2, blur: 5, spread: 1, ...overrides }
    const color = overrides?.color ?? { r: 0, g: 0, b: 0, a: 0.12 }
    return [
      variable({
        id: shadowFigmaId.offsetX,
        name: 'x/offsetX',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: px.offsetX },
      }),
      variable({
        id: shadowFigmaId.offsetY,
        name: 'x/offsetY',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: px.offsetY },
      }),
      variable({
        id: shadowFigmaId.blur,
        name: 'x/blur',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: px.blur },
      }),
      variable({
        id: shadowFigmaId.spread,
        name: 'x/spread',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: px.spread },
      }),
      variable({
        id: shadowFigmaId.color,
        name: 'x/color',
        resolvedType: 'COLOR',
        valuesByMode: { [BASE_MODE]: color },
      }),
    ]
  }

  it('is a no-op when all 5 sub-variables still match the local shadow value', () => {
    const plan = buildBasePullPlan({
      original: [shadow],
      working: [working(shadow)],
      figmaMeta: meta(shadowVariables()),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.creates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(0)
    expect(plan.skipped).toHaveLength(0)
  })

  it('proposes one merged update when a single sub-property changed', () => {
    const plan = buildBasePullPlan({
      original: [shadow],
      working: [working(shadow)],
      figmaMeta: meta(shadowVariables({ blur: 10 })), // 10px = 0.625rem, was 5px
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].type).toBe('shadow')
    expect(plan.updates[0].rawValue).toMatchObject({
      offsetX: { value: 0, unit: 'rem' },
      offsetY: { value: 0.125, unit: 'rem' },
      blur: { value: 0.625, unit: 'rem' },
      spread: { value: 0.0625, unit: 'rem' },
    })
  })

  it('does not half-apply an incomplete match — a missing sub-variable proposes a delete, not a partial update', () => {
    const incomplete = shadowVariables().filter(v => v.id !== shadowFigmaId.spread)
    const plan = buildBasePullPlan({
      original: [shadow],
      working: [working(shadow)],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(1)
    expect(plan.deletes[0].path).toEqual(shadow.path)
  })

  it('does not propose deleting a shadow already removed from working', () => {
    const incomplete = shadowVariables().filter(v => v.id !== shadowFigmaId.spread)
    const plan = buildBasePullPlan({
      original: [shadow],
      working: [],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.deletes).toHaveLength(0)
  })

  it('resolves a shadow whose 5 sub-values all alias another shadow token’s matching sub-properties', () => {
    const target = token({
      path: ['🌐 Global', '🌑 Shadow', 'Elevation2'],
      type: 'shadow',
      figmaId: {
        offsetX: 'VariableID:target:offsetX',
        offsetY: 'VariableID:target:offsetY',
        blur: 'VariableID:target:blur',
        spread: 'VariableID:target:spread',
        color: 'VariableID:target:color',
      },
      rawValue: {
        offsetX: { value: 0, unit: 'rem' },
        offsetY: { value: 0, unit: 'rem' },
        blur: { value: 0, unit: 'rem' },
        spread: { value: 0, unit: 'rem' },
        color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
      },
    })
    const targetVariables = SHADOW_SUB_PROPERTIES_FOR_TEST.map(sub =>
      variable({
        id: (target.figmaId as Record<string, string>)[sub],
        name: `target/${sub}`,
        resolvedType: sub === 'color' ? 'COLOR' : 'FLOAT',
        valuesByMode: { [BASE_MODE]: sub === 'color' ? { r: 0, g: 0, b: 0, a: 1 } : 0 },
      }),
    )
    const aliasingVariables = SHADOW_SUB_PROPERTIES_FOR_TEST.map(sub =>
      variable({
        id: shadowFigmaId[sub as keyof typeof shadowFigmaId],
        name: `x/${sub}`,
        resolvedType: sub === 'color' ? 'COLOR' : 'FLOAT',
        valuesByMode: { [BASE_MODE]: { type: 'VARIABLE_ALIAS', id: (target.figmaId as Record<string, string>)[sub] } },
      }),
    )
    const plan = buildBasePullPlan({
      original: [shadow, target],
      working: [working(shadow), working(target)],
      figmaMeta: meta([...targetVariables, ...aliasingVariables]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].path).toEqual(shadow.path)
    expect(plan.updates[0].referenceTarget).toBe('🌐 Global.🌑 Shadow.Elevation2')
  })
})

const SHADOW_SUB_PROPERTIES_FOR_TEST = ['offsetX', 'offsetY', 'blur', 'spread', 'color'] as const

describe('buildBasePullPlan — border', () => {
  const borderFigmaId = {
    color: 'VariableID:border:color',
    width: 'VariableID:border:width',
    style: 'VariableID:border:style',
  }

  // rawValue mirrors the real authored shape — color/width/style are each a {reference} string
  // (docs/plans/border-token-type-plan.md decision 4). resolvedValue is what flatten.ts's
  // resolveReferences would produce by chasing those references — deriveBorderPullEntries
  // compares against resolvedValue, never rawValue directly (see its doc comment).
  const border = token({
    path: ['🔗 Alias', '▭ Border', 'Composite', 'Grey'],
    type: 'border',
    figmaId: borderFigmaId,
    rawValue: {
      color: '{🔗 Alias.▭ Border.Color.Grey}',
      width: '{🔗 Alias.▭ Border.Width.Base}',
      style: '{🔗 Alias.▭ Border.Style.Solid}',
    },
    resolvedValue: {
      color: { colorSpace: 'srgb', components: [0.816, 0.816, 0.816], alpha: 1, hex: '#D0D0D0' },
      width: { value: 0.125, unit: 'rem' }, // 2px
      style: 'solid',
    },
  })

  function borderVariables(overrides?: {
    color?: { r: number; g: number; b: number; a: number }
    width?: number
    style?: string
  }): FigmaVariable[] {
    const color = overrides?.color ?? { r: 0.816, g: 0.816, b: 0.816, a: 1 }
    const width = overrides?.width ?? 2
    const style = overrides?.style ?? 'solid'
    return [
      variable({
        id: borderFigmaId.color,
        name: 'x/color',
        resolvedType: 'COLOR',
        valuesByMode: { [BASE_MODE]: color },
      }),
      variable({
        id: borderFigmaId.width,
        name: 'x/width',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: width },
      }),
      variable({
        id: borderFigmaId.style,
        name: 'x/style',
        resolvedType: 'STRING',
        valuesByMode: { [BASE_MODE]: style },
      }),
    ]
  }

  it('is a no-op when all 3 sub-variables still match the local resolved border value', () => {
    const plan = buildBasePullPlan({
      original: [border],
      working: [working(border)],
      figmaMeta: meta(borderVariables()),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.creates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(0)
    expect(plan.skipped).toHaveLength(0)
  })

  it("proposes an update preserving color/width's original reference strings when only style changed", () => {
    const plan = buildBasePullPlan({
      original: [border],
      working: [working(border)],
      figmaMeta: meta(borderVariables({ style: 'dashed' })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].type).toBe('border')
    expect(plan.updates[0].rawValue).toEqual({
      color: '{🔗 Alias.▭ Border.Color.Grey}',
      width: '{🔗 Alias.▭ Border.Width.Base}',
      style: '{🔗 Alias.▭ Border.Style.Dashed}',
    })
  })

  it('skips (does not auto-write a literal) when color or width differs from what the local reference resolves to', () => {
    const plan = buildBasePullPlan({
      original: [border],
      working: [working(border)],
      figmaMeta: meta(borderVariables({ width: 4 })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.skipped.length).toBeGreaterThan(0)
    expect(plan.skipped[0].reason).toMatch(/no safe way to auto-write a literal/)
  })

  it('does not half-apply an incomplete match — a missing sub-variable proposes a delete, not a partial update', () => {
    const incomplete = borderVariables().filter(v => v.id !== borderFigmaId.style)
    const plan = buildBasePullPlan({
      original: [border],
      working: [working(border)],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(1)
    expect(plan.deletes[0].path).toEqual(border.path)
  })

  it('does not propose deleting a border token already removed from working', () => {
    const incomplete = borderVariables().filter(v => v.id !== borderFigmaId.style)
    const plan = buildBasePullPlan({
      original: [border],
      working: [],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.deletes).toHaveLength(0)
  })

  it('resolves a border whose 3 sub-values all alias another border token’s matching sub-properties', () => {
    const target = token({
      path: ['🔗 Alias', '▭ Border', 'Composite', 'Primary'],
      type: 'border',
      figmaId: {
        color: 'VariableID:target:color',
        width: 'VariableID:target:width',
        style: 'VariableID:target:style',
      },
      rawValue: {
        color: '{🔗 Alias.▭ Border.Color.Primary}',
        width: '{🔗 Alias.▭ Border.Width.Base}',
        style: '{🔗 Alias.▭ Border.Style.Solid}',
      },
      resolvedValue: {
        color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
        width: { value: 0.125, unit: 'rem' },
        style: 'solid',
      },
    })
    const BORDER_SUB_PROPERTIES_FOR_TEST = ['color', 'width', 'style'] as const
    const targetVariables = BORDER_SUB_PROPERTIES_FOR_TEST.map(sub =>
      variable({
        id: (target.figmaId as Record<string, string>)[sub],
        name: `target/${sub}`,
        resolvedType: sub === 'color' ? 'COLOR' : sub === 'width' ? 'FLOAT' : 'STRING',
        valuesByMode: {
          [BASE_MODE]: sub === 'color' ? { r: 0, g: 0, b: 0, a: 1 } : sub === 'width' ? 2 : 'solid',
        },
      }),
    )
    const aliasingVariables = BORDER_SUB_PROPERTIES_FOR_TEST.map(sub =>
      variable({
        id: borderFigmaId[sub],
        name: `x/${sub}`,
        resolvedType: sub === 'color' ? 'COLOR' : sub === 'width' ? 'FLOAT' : 'STRING',
        valuesByMode: { [BASE_MODE]: { type: 'VARIABLE_ALIAS', id: (target.figmaId as Record<string, string>)[sub] } },
      }),
    )
    const plan = buildBasePullPlan({
      original: [border, target],
      working: [working(border), working(target)],
      figmaMeta: meta([...targetVariables, ...aliasingVariables]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].path).toEqual(border.path)
    expect(plan.updates[0].referenceTarget).toBe('🔗 Alias.▭ Border.Composite.Primary')
  })
})

describe('buildBasePullPlan — typography', () => {
  const typographyFigmaId = {
    fontFamily: 'VariableID:typography:fontFamily',
    fontSize: 'VariableID:typography:fontSize',
    fontWeight: 'VariableID:typography:fontWeight',
    lineHeight: 'VariableID:typography:lineHeight',
  }

  // fontFamily/fontWeight are always {reference} strings (docs/plans/typography-token-type-
  // plan.md decision 4); fontSize/lineHeight here are literals (decision 4 also allows a
  // reference for these two, but a literal exercises the "resolvedValue === rawValue" path most
  // directly). resolvedValue is what flatten.ts's resolveReferences would produce.
  const familyHeading = token({
    path: ['🌐 Global', '🔤 Font', 'Family', 'Heading'],
    type: 'fontFamily',
    rawValue: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
    resolvedValue: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
  })
  const familyBody = token({
    path: ['🌐 Global', '🔤 Font', 'Family', 'Body'],
    type: 'fontFamily',
    rawValue: ['BaloiseCreateText', 'Arial', 'sans-serif'],
    resolvedValue: ['BaloiseCreateText', 'Arial', 'sans-serif'],
  })
  const weight700 = token({
    path: ['🌐 Global', '🔤 Font', 'Weight', '700'],
    type: 'fontWeight',
    rawValue: 700,
    resolvedValue: 700,
  })
  const weight400 = token({
    path: ['🌐 Global', '🔤 Font', 'Weight', '400'],
    type: 'fontWeight',
    rawValue: 400,
    resolvedValue: 400,
  })

  const typography = token({
    path: ['🌐 Global', '🔤 Font', 'Typography', 'Test'],
    type: 'typography',
    figmaId: typographyFigmaId,
    rawValue: {
      fontFamily: '{🌐 Global.🔤 Font.Family.Heading}',
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
      lineHeight: 1.3,
    },
    resolvedValue: {
      fontFamily: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: 700,
      lineHeight: 1.3,
    },
  })
  const typographyPrimitives = [familyHeading, familyBody, weight700, weight400]

  function typographyVariables(overrides?: {
    fontFamily?: string
    fontSize?: number
    fontWeight?: string
    lineHeight?: number
  }): FigmaVariable[] {
    const fontFamily = overrides?.fontFamily ?? 'BaloiseCreateHeadline'
    const fontSize = overrides?.fontSize ?? 16
    const fontWeight = overrides?.fontWeight ?? 'Bold'
    const lineHeight = overrides?.lineHeight ?? 1.3
    return [
      variable({
        id: typographyFigmaId.fontFamily,
        name: 'x/FontFamily',
        resolvedType: 'STRING',
        valuesByMode: { [BASE_MODE]: fontFamily },
      }),
      variable({
        id: typographyFigmaId.fontSize,
        name: 'x/FontSize',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: fontSize },
      }),
      variable({
        id: typographyFigmaId.fontWeight,
        name: 'x/FontWeight',
        resolvedType: 'STRING',
        valuesByMode: { [BASE_MODE]: fontWeight },
      }),
      variable({
        id: typographyFigmaId.lineHeight,
        name: 'x/LineHeight',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: lineHeight },
      }),
    ]
  }

  it('is a no-op when all 4 sub-variables still match the local resolved typography value', () => {
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography],
      working: [working(typography)],
      figmaMeta: meta(typographyVariables()),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.creates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(0)
    expect(plan.skipped).toHaveLength(0)
  })

  it('proposes an update preserving fontSize/lineHeight when only fontFamily changed, resolved via the Font.Family primitive index', () => {
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography],
      working: [working(typography)],
      figmaMeta: meta(typographyVariables({ fontFamily: 'BaloiseCreateText' })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].type).toBe('typography')
    expect(plan.updates[0].rawValue).toEqual({
      fontFamily: '{🌐 Global.🔤 Font.Family.Body}',
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
      lineHeight: 1.3,
    })
  })

  it('proposes an update preserving the rest when only fontWeight changed, resolved via the Font.Weight primitive index', () => {
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography],
      working: [working(typography)],
      figmaMeta: meta(typographyVariables({ fontWeight: 'Regular' })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].rawValue).toEqual({
      fontFamily: '{🌐 Global.🔤 Font.Family.Heading}',
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: '{🌐 Global.🔤 Font.Weight.400}',
      lineHeight: 1.3,
    })
  })

  it('skips (does not auto-write a literal) when fontSize differs from what the local value resolves to', () => {
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography],
      working: [working(typography)],
      figmaMeta: meta(typographyVariables({ fontSize: 20 })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.skipped.length).toBeGreaterThan(0)
    expect(plan.skipped[0].reason).toMatch(/no safe way to auto-write a literal/)
  })

  it('skips when fontFamily does not match any known Font.Family primitive', () => {
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography],
      working: [working(typography)],
      figmaMeta: meta(typographyVariables({ fontFamily: 'ComicSans' })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.skipped.length).toBeGreaterThan(0)
    expect(plan.skipped[0].reason).toMatch(/doesn't match a known Font.Family primitive/)
  })

  it('does not half-apply an incomplete match — a missing sub-variable proposes a delete, not a partial update', () => {
    const incomplete = typographyVariables().filter(v => v.id !== typographyFigmaId.lineHeight)
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography],
      working: [working(typography)],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(1)
    expect(plan.deletes[0].path).toEqual(typography.path)
  })

  it('does not propose deleting a typography token already removed from working', () => {
    const incomplete = typographyVariables().filter(v => v.id !== typographyFigmaId.lineHeight)
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography],
      working: [],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.deletes).toHaveLength(0)
  })

  it('resolves a typography token whose 4 sub-values all alias another typography token’s matching sub-properties', () => {
    const target = token({
      path: ['🌐 Global', '🔤 Font', 'Typography', 'Other'],
      type: 'typography',
      figmaId: {
        fontFamily: 'VariableID:target:fontFamily',
        fontSize: 'VariableID:target:fontSize',
        fontWeight: 'VariableID:target:fontWeight',
        lineHeight: 'VariableID:target:lineHeight',
      },
      rawValue: {
        fontFamily: '{🌐 Global.🔤 Font.Family.Body}',
        fontSize: { value: 1.5, unit: 'rem' },
        fontWeight: '{🌐 Global.🔤 Font.Weight.400}',
        lineHeight: 1.5,
      },
      resolvedValue: {
        fontFamily: ['BaloiseCreateText', 'Arial', 'sans-serif'],
        fontSize: { value: 1.5, unit: 'rem' },
        fontWeight: 400,
        lineHeight: 1.5,
      },
    })
    const TYPOGRAPHY_SUB_PROPERTIES_FOR_TEST = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'] as const
    const targetVariables = TYPOGRAPHY_SUB_PROPERTIES_FOR_TEST.map(sub =>
      variable({
        id: (target.figmaId as Record<string, string>)[sub],
        name: `target/${sub}`,
        resolvedType: sub === 'fontSize' || sub === 'lineHeight' ? 'FLOAT' : 'STRING',
        valuesByMode: {
          [BASE_MODE]:
            sub === 'fontFamily'
              ? 'BaloiseCreateText'
              : sub === 'fontSize'
                ? 24
                : sub === 'fontWeight'
                  ? 'Regular'
                  : 1.5,
        },
      }),
    )
    const aliasingVariables = TYPOGRAPHY_SUB_PROPERTIES_FOR_TEST.map(sub =>
      variable({
        id: typographyFigmaId[sub],
        name: `x/${sub}`,
        resolvedType: sub === 'fontSize' || sub === 'lineHeight' ? 'FLOAT' : 'STRING',
        valuesByMode: { [BASE_MODE]: { type: 'VARIABLE_ALIAS', id: (target.figmaId as Record<string, string>)[sub] } },
      }),
    )
    const plan = buildBasePullPlan({
      original: [...typographyPrimitives, typography, target],
      working: [working(typography), working(target)],
      figmaMeta: meta([...targetVariables, ...aliasingVariables]),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].path).toEqual(typography.path)
    expect(plan.updates[0].referenceTarget).toBe('🌐 Global.🔤 Font.Typography.Other')
  })
})

describe('buildBasePullPlan — responsive dimension', () => {
  const responsiveFigmaId = {
    mobile: 'VariableID:responsive:mobile',
    tablet: 'VariableID:responsive:tablet',
    desktop: 'VariableID:responsive:desktop',
  }

  const space16 = token({
    path: ['🌐 Global', '📏 Dimension', 'Space', '16'],
    type: 'dimension',
    rawValue: { value: 1, unit: 'rem' },
    resolvedValue: { value: 1, unit: 'rem' },
  })

  // mobile is a {reference} string (docs/plans/responsive-dimension-token-plan.md decision 3);
  // tablet/desktop are literals — exercises both shapes, same as border's/typography's own tests.
  const responsive = token({
    path: ['🔗 Alias', '↔️ Space', 'Lg'],
    type: 'dimension',
    figmaId: responsiveFigmaId,
    rawValue: { value: 16, unit: 'px' },
    resolvedValue: { value: 16, unit: 'px' },
    responsive: {
      mobile: '{🌐 Global.📏 Dimension.Space.16}',
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 32, unit: 'px' },
    },
    resolvedResponsive: {
      mobile: { value: 1, unit: 'rem' },
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 32, unit: 'px' },
    },
  })
  const responsivePrimitives = [space16]

  function responsiveVariables(overrides?: { mobile?: number; tablet?: number; desktop?: number }): FigmaVariable[] {
    return [
      variable({
        id: responsiveFigmaId.mobile,
        name: 'x/Mobile',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: overrides?.mobile ?? 16 },
      }),
      variable({
        id: responsiveFigmaId.tablet,
        name: 'x/Tablet',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: overrides?.tablet ?? 24 },
      }),
      variable({
        id: responsiveFigmaId.desktop,
        name: 'x/Desktop',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: overrides?.desktop ?? 32 },
      }),
    ]
  }

  it('is a no-op when all 3 sub-variables still match the local resolved responsive value', () => {
    const plan = buildBasePullPlan({
      original: [...responsivePrimitives, responsive],
      working: [working(responsive)],
      figmaMeta: meta(responsiveVariables()),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.creates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(0)
    expect(plan.skipped).toHaveLength(0)
  })

  it("proposes an update preserving mobile's reference when only desktop changed", () => {
    const plan = buildBasePullPlan({
      original: [...responsivePrimitives, responsive],
      working: [working(responsive)],
      figmaMeta: meta(responsiveVariables({ desktop: 40 })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].type).toBe('dimension')
    expect(plan.updates[0].responsive).toEqual({
      mobile: '{🌐 Global.📏 Dimension.Space.16}',
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 40, unit: 'px' },
    })
    // decision 4: rawValue mirrors mobile, which resolves to 1rem — unaffected by desktop's change.
    expect(plan.updates[0].rawValue).toEqual('{🌐 Global.📏 Dimension.Space.16}')
  })

  it('skips (does not auto-write a literal) when the reference-backed mobile breakpoint differs from what it resolves to', () => {
    const plan = buildBasePullPlan({
      original: [...responsivePrimitives, responsive],
      working: [working(responsive)],
      figmaMeta: meta(responsiveVariables({ mobile: 20 })),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.skipped.length).toBeGreaterThan(0)
    expect(plan.skipped[0].reason).toMatch(/no safe way/)
  })

  it('does not half-apply an incomplete match — a missing sub-variable proposes a delete, not a partial update', () => {
    const incomplete = responsiveVariables().filter(v => v.id !== responsiveFigmaId.desktop)
    const plan = buildBasePullPlan({
      original: [...responsivePrimitives, responsive],
      working: [working(responsive)],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.deletes).toHaveLength(1)
    expect(plan.deletes[0].path).toEqual(responsive.path)
  })

  it('does not propose deleting a responsive dimension token already removed from working', () => {
    const incomplete = responsiveVariables().filter(v => v.id !== responsiveFigmaId.desktop)
    const plan = buildBasePullPlan({
      original: [...responsivePrimitives, responsive],
      working: [],
      figmaMeta: meta(incomplete),
      baseModeId: BASE_MODE,
    })
    expect(plan.deletes).toHaveLength(0)
  })

  it("skips a breakpoint that is a Figma alias — not something this app's own push side produces", () => {
    const aliased = [
      ...responsiveVariables().filter(v => v.id !== responsiveFigmaId.mobile),
      variable({
        id: responsiveFigmaId.mobile,
        name: 'x/Mobile',
        resolvedType: 'FLOAT',
        valuesByMode: { [BASE_MODE]: { type: 'VARIABLE_ALIAS', id: 'VariableID:something-else' } },
      }),
    ]
    const plan = buildBasePullPlan({
      original: [...responsivePrimitives, responsive],
      working: [working(responsive)],
      figmaMeta: meta(aliased),
      baseModeId: BASE_MODE,
    })
    expect(plan.updates).toHaveLength(0)
    expect(plan.skipped.length).toBeGreaterThan(0)
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
      id: white.figmaId as string,
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
      id: white.figmaId as string,
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

  it("merges a fontFamily update against the brand's own override array, not Base's", () => {
    const baseHeading = token({
      path: ['🌐 Global', '🔤 Font', 'Family', 'Heading'],
      type: 'fontFamily',
      rawValue: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
      figmaId: 'VariableID:9',
    })
    const override = token({
      path: baseHeading.path,
      type: 'fontFamily',
      rawValue: ['TcsHeadline', 'Helvetica', 'sans-serif'],
    })
    const v = variable({
      id: baseHeading.figmaId as string,
      name: 'x',
      resolvedType: 'STRING',
      valuesByMode: { [TCS_MODE]: 'Roboto' },
    })
    const plan = buildBrandPullPlan({
      baseOriginal: [baseHeading],
      brandOriginal: [override],
      brandWorking: [working(override)],
      figmaMeta: meta([v], ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    // Helvetica/sans-serif (the override's own fallback tail) survive — not Arial/sans-serif from Base.
    expect(plan.updates[0].rawValue).toEqual(['Roboto', 'Helvetica', 'sans-serif'])
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

describe('buildBrandPullPlan — typography', () => {
  const familyHeading = token({
    path: ['🌐 Global', '🔤 Font', 'Family', 'Heading'],
    type: 'fontFamily',
    rawValue: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
    resolvedValue: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
  })
  const familyBody = token({
    path: ['🌐 Global', '🔤 Font', 'Family', 'Body'],
    type: 'fontFamily',
    rawValue: ['BaloiseCreateText', 'Arial', 'sans-serif'],
    resolvedValue: ['BaloiseCreateText', 'Arial', 'sans-serif'],
  })
  const familyMono = token({
    path: ['🌐 Global', '🔤 Font', 'Family', 'Mono'],
    type: 'fontFamily',
    rawValue: ['BaloiseCreateMono', 'Courier', 'monospace'],
    resolvedValue: ['BaloiseCreateMono', 'Courier', 'monospace'],
  })
  const weight700 = token({
    path: ['🌐 Global', '🔤 Font', 'Weight', '700'],
    type: 'fontWeight',
    rawValue: 700,
    resolvedValue: 700,
  })

  const typographyFigmaId = {
    fontFamily: 'VariableID:brand-typography:fontFamily',
    fontSize: 'VariableID:brand-typography:fontSize',
    fontWeight: 'VariableID:brand-typography:fontWeight',
    lineHeight: 'VariableID:brand-typography:lineHeight',
  }
  const baseTypography = token({
    path: ['🌐 Global', '🔤 Font', 'Typography', 'Test'],
    type: 'typography',
    figmaId: typographyFigmaId,
    rawValue: {
      fontFamily: '{🌐 Global.🔤 Font.Family.Heading}',
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
      lineHeight: 1.3,
    },
    resolvedValue: {
      fontFamily: ['BaloiseCreateHeadline', 'Arial', 'sans-serif'],
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: 700,
      lineHeight: 1.3,
    },
  })
  const baseOriginal = [familyHeading, familyBody, familyMono, weight700, baseTypography]

  function typographyBrandVariables(fontFamily = 'BaloiseCreateHeadline'): FigmaVariable[] {
    return [
      variable({
        id: typographyFigmaId.fontFamily,
        name: 'x/FontFamily',
        resolvedType: 'STRING',
        valuesByMode: { [TCS_MODE]: fontFamily },
      }),
      variable({
        id: typographyFigmaId.fontSize,
        name: 'x/FontSize',
        resolvedType: 'FLOAT',
        valuesByMode: { [TCS_MODE]: 16 },
      }),
      variable({
        id: typographyFigmaId.fontWeight,
        name: 'x/FontWeight',
        resolvedType: 'STRING',
        valuesByMode: { [TCS_MODE]: 'Bold' },
      }),
      variable({
        id: typographyFigmaId.lineHeight,
        name: 'x/LineHeight',
        resolvedType: 'FLOAT',
        valuesByMode: { [TCS_MODE]: 1.3 },
      }),
    ]
  }

  it('proposes a new override when the brand mode diverges from the inherited Base typography value', () => {
    const plan = buildBrandPullPlan({
      baseOriginal,
      brandOriginal: [],
      brandWorking: [],
      figmaMeta: meta(typographyBrandVariables('BaloiseCreateText'), ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.creates).toHaveLength(1)
    expect(plan.creates[0].rawValue).toEqual({
      fontFamily: '{🌐 Global.🔤 Font.Family.Body}',
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
      lineHeight: 1.3,
    })
  })

  it('updates an existing override when the brand mode changes again', () => {
    const override = token({
      path: baseTypography.path,
      type: 'typography',
      rawValue: {
        fontFamily: '{🌐 Global.🔤 Font.Family.Body}',
        fontSize: { value: 1, unit: 'rem' },
        fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
        lineHeight: 1.3,
      },
      resolvedValue: {
        fontFamily: ['BaloiseCreateText', 'Arial', 'sans-serif'],
        fontSize: { value: 1, unit: 'rem' },
        fontWeight: 700,
        lineHeight: 1.3,
      },
    })
    const plan = buildBrandPullPlan({
      baseOriginal,
      brandOriginal: [override],
      brandWorking: [working(override)],
      // Neither Base's own family (Heading) nor the override's current one (Body) — exercises the
      // update path specifically, distinct from the "reconverges with Base" delete path below.
      figmaMeta: meta(typographyBrandVariables('BaloiseCreateMono'), ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].rawValue).toEqual({
      fontFamily: '{🌐 Global.🔤 Font.Family.Mono}',
      fontSize: { value: 1, unit: 'rem' },
      fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
      lineHeight: 1.3,
    })
  })

  it('proposes deleting an override once the brand mode reconverges with the inherited Base value', () => {
    const override = token({
      path: baseTypography.path,
      type: 'typography',
      rawValue: {
        fontFamily: '{🌐 Global.🔤 Font.Family.Body}',
        fontSize: { value: 1, unit: 'rem' },
        fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
        lineHeight: 1.3,
      },
      resolvedValue: {
        fontFamily: ['BaloiseCreateText', 'Arial', 'sans-serif'],
        fontSize: { value: 1, unit: 'rem' },
        fontWeight: 700,
        lineHeight: 1.3,
      },
    })
    const plan = buildBrandPullPlan({
      baseOriginal,
      brandOriginal: [override],
      brandWorking: [working(override)],
      figmaMeta: meta(typographyBrandVariables('BaloiseCreateHeadline'), ['Tcs']), // back to Base's own family
      brandModeId: TCS_MODE,
    })
    expect(plan.deletes).toHaveLength(1)
  })

  it('cleans up a dangling typography override when the underlying Base variables are removed', () => {
    const override = token({
      path: baseTypography.path,
      type: 'typography',
      rawValue: {
        fontFamily: '{🌐 Global.🔤 Font.Family.Body}',
        fontSize: { value: 1, unit: 'rem' },
        fontWeight: '{🌐 Global.🔤 Font.Weight.700}',
        lineHeight: 1.3,
      },
    })
    const plan = buildBrandPullPlan({
      baseOriginal,
      brandOriginal: [override],
      brandWorking: [working(override)],
      figmaMeta: meta([], ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.deletes).toHaveLength(1)
  })
})

describe('buildBrandPullPlan — responsive dimension', () => {
  const responsiveFigmaId = {
    mobile: 'VariableID:brand-responsive:mobile',
    tablet: 'VariableID:brand-responsive:tablet',
    desktop: 'VariableID:brand-responsive:desktop',
  }
  const baseResponsive = token({
    path: ['🔗 Alias', '↔️ Space', 'Lg'],
    type: 'dimension',
    figmaId: responsiveFigmaId,
    rawValue: { value: 16, unit: 'px' },
    resolvedValue: { value: 16, unit: 'px' },
    responsive: {
      mobile: { value: 16, unit: 'px' },
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 32, unit: 'px' },
    },
    resolvedResponsive: {
      mobile: { value: 16, unit: 'px' },
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 32, unit: 'px' },
    },
  })
  const baseOriginalResponsive = [baseResponsive]

  function responsiveBrandVariables(overrides?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }): FigmaVariable[] {
    return [
      variable({
        id: responsiveFigmaId.mobile,
        name: 'x/Mobile',
        resolvedType: 'FLOAT',
        valuesByMode: { [TCS_MODE]: overrides?.mobile ?? 8 },
      }),
      variable({
        id: responsiveFigmaId.tablet,
        name: 'x/Tablet',
        resolvedType: 'FLOAT',
        valuesByMode: { [TCS_MODE]: overrides?.tablet ?? 12 },
      }),
      variable({
        id: responsiveFigmaId.desktop,
        name: 'x/Desktop',
        resolvedType: 'FLOAT',
        valuesByMode: { [TCS_MODE]: overrides?.desktop ?? 16 },
      }),
    ]
  }

  it('proposes a new override when the brand mode diverges from the inherited Base responsive value', () => {
    const plan = buildBrandPullPlan({
      baseOriginal: baseOriginalResponsive,
      brandOriginal: [],
      brandWorking: [],
      figmaMeta: meta(responsiveBrandVariables(), ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.creates).toHaveLength(1)
    expect(plan.creates[0].responsive).toEqual({
      mobile: { value: 8, unit: 'px' },
      tablet: { value: 12, unit: 'px' },
      desktop: { value: 16, unit: 'px' },
    })
  })

  it('updates an existing override when the brand mode changes again', () => {
    const override = token({
      path: baseResponsive.path,
      type: 'dimension',
      rawValue: { value: 8, unit: 'px' },
      resolvedValue: { value: 8, unit: 'px' },
      responsive: {
        mobile: { value: 8, unit: 'px' },
        tablet: { value: 12, unit: 'px' },
        desktop: { value: 16, unit: 'px' },
      },
      resolvedResponsive: {
        mobile: { value: 8, unit: 'px' },
        tablet: { value: 12, unit: 'px' },
        desktop: { value: 16, unit: 'px' },
      },
    })
    const plan = buildBrandPullPlan({
      baseOriginal: baseOriginalResponsive,
      brandOriginal: [override],
      brandWorking: [working(override)],
      figmaMeta: meta(responsiveBrandVariables({ desktop: 20 }), ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.updates).toHaveLength(1)
    expect(plan.updates[0].responsive).toEqual({
      mobile: { value: 8, unit: 'px' },
      tablet: { value: 12, unit: 'px' },
      desktop: { value: 20, unit: 'px' },
    })
  })

  it('proposes deleting an override once the brand mode reconverges with the inherited Base value', () => {
    const override = token({
      path: baseResponsive.path,
      type: 'dimension',
      rawValue: { value: 8, unit: 'px' },
      resolvedValue: { value: 8, unit: 'px' },
      responsive: {
        mobile: { value: 8, unit: 'px' },
        tablet: { value: 12, unit: 'px' },
        desktop: { value: 16, unit: 'px' },
      },
      resolvedResponsive: {
        mobile: { value: 8, unit: 'px' },
        tablet: { value: 12, unit: 'px' },
        desktop: { value: 16, unit: 'px' },
      },
    })
    const plan = buildBrandPullPlan({
      baseOriginal: baseOriginalResponsive,
      brandOriginal: [override],
      brandWorking: [working(override)],
      // Back to Base's own values (16/24/32).
      figmaMeta: meta(responsiveBrandVariables({ mobile: 16, tablet: 24, desktop: 32 }), ['Tcs']),
      brandModeId: TCS_MODE,
    })
    expect(plan.deletes).toHaveLength(1)
  })

  it('cleans up a dangling responsive dimension override when the underlying Base variables are removed', () => {
    const override = token({
      path: baseResponsive.path,
      type: 'dimension',
      rawValue: { value: 8, unit: 'px' },
      responsive: {
        mobile: { value: 8, unit: 'px' },
        tablet: { value: 12, unit: 'px' },
        desktop: { value: 16, unit: 'px' },
      },
    })
    const plan = buildBrandPullPlan({
      baseOriginal: baseOriginalResponsive,
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
      id: white.figmaId as string,
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
      id: white.figmaId as string,
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
