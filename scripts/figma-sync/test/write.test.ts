import { describe, expect, it } from 'vitest'
import { buildTokenIndex } from '../lib/alias.mjs'
import { buildNameIndex, findCollectionAndModes } from '../lib/figma.mjs'
import {
  figmaBorderSubValuesFor,
  figmaShadowSubValuesFor,
  figmaValueFor,
  flattenVariableId,
  resolvedTypeFor,
} from '../lib/figma-value.mjs'
import {
  assignVariableIds,
  buildAliasPassPayload,
  buildCreatePassPayload,
  collectNewlyCreatedIds,
  figmaBorderSubVariableName,
  figmaShadowSubVariableName,
  figmaVariableName,
  resolveTempIds,
} from '../lib/write.mjs'

describe('figma-value', () => {
  it('maps a DTCG color to a Figma RGBA value (components already 0-1 srgb floats)', () => {
    expect(figmaValueFor('color', { colorSpace: 'srgb', components: [1, 0.5, 0], alpha: 0.8, hex: '#FF8000' })).toEqual(
      {
        r: 1,
        g: 0.5,
        b: 0,
        a: 0.8,
      },
    )
  })

  it('passes number/string/boolean straight through', () => {
    expect(figmaValueFor('number', 16)).toBe(16)
    expect(figmaValueFor('string', '0 2px 8px rgba(0,0,0,0.1)')).toBe('0 2px 8px rgba(0,0,0,0.1)')
    expect(figmaValueFor('boolean', true)).toBe(true)
  })

  it("maps a fontWeight number to its DTCG keyword — Figma needs the font's named style, not a number", () => {
    expect(figmaValueFor('fontWeight', 100)).toBe('Thin')
    expect(figmaValueFor('fontWeight', 400)).toBe('Regular')
    expect(figmaValueFor('fontWeight', 700)).toBe('Bold')
    expect(figmaValueFor('fontWeight', 950)).toBe('Extra-Black')
  })

  it('fails loudly on a fontWeight value outside the 10 known weights', () => {
    expect(() => figmaValueFor('fontWeight', 650)).toThrow(/Unsupported fontWeight value "650"/)
  })

  it('sends only the first entry of a fontFamily array — Figma has no font-stack concept', () => {
    expect(figmaValueFor('fontFamily', ['BaloiseCreateHeadline', 'Arial', 'sans-serif'])).toBe('BaloiseCreateHeadline')
    expect(figmaValueFor('fontFamily', ['inherit'])).toBe('inherit')
  })

  it('fails loudly on an empty or non-array fontFamily value', () => {
    expect(() => figmaValueFor('fontFamily', [])).toThrow(/Unsupported fontFamily value/)
    expect(() => figmaValueFor('fontFamily', 'Arial')).toThrow(/Unsupported fontFamily value/)
  })

  it('maps a rem-unit dimension to px by multiplying by 16 — Figma is always raw px floats', () => {
    expect(figmaValueFor('dimension', { value: 1.5, unit: 'rem' })).toBe(24)
    expect(figmaValueFor('dimension', { value: 0.0625, unit: 'rem' })).toBe(1)
  })

  it('passes a px-unit dimension straight through, unconverted', () => {
    expect(figmaValueFor('dimension', { value: 769, unit: 'px' })).toBe(769)
    expect(figmaValueFor('dimension', { value: 9999, unit: 'px' })).toBe(9999)
  })

  it('fails loudly on a malformed dimension value', () => {
    expect(() => figmaValueFor('dimension', { value: 1.5, unit: 'em' })).toThrow(/Unsupported dimension value/)
    expect(() => figmaValueFor('dimension', 24)).toThrow(/Unsupported dimension value/)
  })

  it('fails loudly on an unmapped $type instead of guessing', () => {
    expect(() => figmaValueFor('duration', '200ms')).toThrow(/Unsupported token \$type "duration"/)
  })

  it('maps $type to the matching Figma resolvedType', () => {
    expect(resolvedTypeFor('color')).toBe('COLOR')
    expect(resolvedTypeFor('number')).toBe('FLOAT')
    expect(resolvedTypeFor('string')).toBe('STRING')
    expect(resolvedTypeFor('boolean')).toBe('BOOLEAN')
  })

  it('maps fontWeight to STRING, same as string — Figma has no native font-weight type', () => {
    expect(resolvedTypeFor('fontWeight')).toBe('STRING')
  })

  it('maps dimension to FLOAT, same as number — Figma variables are always raw px floats', () => {
    expect(resolvedTypeFor('dimension')).toBe('FLOAT')
  })

  it('maps fontFamily to STRING too — Figma has no font-stack/array type', () => {
    expect(resolvedTypeFor('fontFamily')).toBe('STRING')
  })
})

describe('figmaShadowSubValuesFor', () => {
  const singleLayer = {
    color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 0.15, hex: '#000000' },
    offsetX: { value: 0, unit: 'rem' },
    offsetY: { value: 0.25, unit: 'rem' },
    blur: { value: 0.75, unit: 'rem' },
    spread: { value: 0, unit: 'rem' },
  }

  it('decomposes a single-layer shadow into 5 Figma-ready sub-values, converting dimensions to px', () => {
    expect(figmaShadowSubValuesFor(singleLayer)).toEqual({
      offsetX: 0,
      offsetY: 4,
      blur: 12,
      spread: 0,
      color: { r: 0, g: 0, b: 0, a: 0.15 },
    })
  })

  it('returns null for a multi-layer (array) shadow — not synced', () => {
    expect(figmaShadowSubValuesFor([singleLayer, singleLayer])).toBeNull()
  })

  it('returns null for the empty-array "none" shadow — not synced', () => {
    expect(figmaShadowSubValuesFor([])).toBeNull()
  })
})

describe('flattenVariableId', () => {
  it('wraps a normal string variableId in a single untagged entry', () => {
    expect(flattenVariableId('VariableID:1:1')).toEqual([{ id: 'VariableID:1:1', subProperty: undefined }])
  })

  it('flattens a shadow variableId object into 5 tagged entries', () => {
    const id = { offsetX: 'id-x', offsetY: 'id-y', blur: 'id-b', spread: 'id-s', color: 'id-c' }
    expect(flattenVariableId(id)).toEqual([
      { id: 'id-x', subProperty: 'offsetX' },
      { id: 'id-y', subProperty: 'offsetY' },
      { id: 'id-b', subProperty: 'blur' },
      { id: 'id-s', subProperty: 'spread' },
      { id: 'id-c', subProperty: 'color' },
    ])
  })

  it('flattens a border variableId object into 3 tagged entries', () => {
    const id = { color: 'id-c', width: 'id-w', style: 'id-s' }
    expect(flattenVariableId(id)).toEqual([
      { id: 'id-c', subProperty: 'color' },
      { id: 'id-w', subProperty: 'width' },
      { id: 'id-s', subProperty: 'style' },
    ])
  })

  it('returns an empty list for a missing/undefined variableId', () => {
    expect(flattenVariableId(undefined)).toEqual([])
  })
})

describe('figmaBorderSubValuesFor', () => {
  // Unlike shadow, a border token's color/width/style are each a {reference} string pointing at
  // a real primitive token — figmaBorderSubValuesFor needs a tokenIndex to resolve them.
  const colorToken = {
    path: ['Alias', 'Border', 'Color', 'Grey'],
    type: 'color',
    value: {
      kind: 'literal',
      value: { colorSpace: 'srgb', components: [0.816, 0.816, 0.816], alpha: 1, hex: '#D0D0D0' },
    },
  }
  const widthToken = {
    path: ['Alias', 'Border', 'Width', 'Base'],
    type: 'dimension',
    value: { kind: 'literal', value: { value: 0.125, unit: 'rem' } },
  }
  const styleToken = {
    path: ['Alias', 'Border', 'Style', 'Solid'],
    type: 'string',
    value: { kind: 'literal', value: 'solid' },
  }
  const tokenIndex = buildTokenIndex([colorToken, widthToken, styleToken])

  const borderValue = {
    color: '{Alias.Border.Color.Grey}',
    width: '{Alias.Border.Width.Base}',
    style: '{Alias.Border.Style.Solid}',
  }

  it('decomposes a border value into 3 Figma-ready sub-values, resolving references and converting width to px', () => {
    expect(figmaBorderSubValuesFor(borderValue, tokenIndex)).toEqual({
      color: { r: 0.816, g: 0.816, b: 0.816, a: 1 },
      width: 2,
      style: 'solid',
    })
  })

  it('returns null for a malformed value (missing sub-value)', () => {
    expect(figmaBorderSubValuesFor({ color: borderValue.color, width: borderValue.width }, tokenIndex)).toBeNull()
  })

  it('returns null when style does not resolve to a string', () => {
    const numericStyleToken = { path: ['Alias', 'Bad'], type: 'number', value: { kind: 'literal', value: 5 } }
    const badIndex = buildTokenIndex([colorToken, widthToken, numericStyleToken])
    expect(figmaBorderSubValuesFor({ ...borderValue, style: '{Alias.Bad}' }, badIndex)).toBeNull()
  })
})

describe('shadow push (two-pass write payload)', () => {
  const shadowValue = {
    color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 0.15, hex: '#000000' },
    offsetX: { value: 0, unit: 'rem' },
    offsetY: { value: 0.25, unit: 'rem' },
    blur: { value: 0.75, unit: 'rem' },
    spread: { value: 0, unit: 'rem' },
  }
  const shadowToken = {
    path: ['Global', 'Shadow', 'Base'],
    type: 'shadow',
    value: { kind: 'literal', value: shadowValue },
  }
  const shadowRefToken = {
    path: ['Alias', 'Shadow', 'Base'],
    type: 'shadow',
    value: { kind: 'reference', path: ['Global', 'Shadow', 'Base'] },
  }
  const multiLayerToken = {
    path: ['Global', 'Shadow', 'Stacked'],
    type: 'shadow',
    value: { kind: 'literal', value: [shadowValue, shadowValue] },
  }
  const noneToken = {
    path: ['Global', 'Shadow', 'None'],
    type: 'shadow',
    value: { kind: 'literal', value: [] },
  }
  const shadowBaseTokens = [shadowToken, shadowRefToken, multiLayerToken, noneToken]

  it('assigns 5 temp sub-ids to a never-synced single-layer shadow token', () => {
    const idByPath = assignVariableIds(shadowBaseTokens)
    expect(idByPath.get('Global.Shadow.Base')).toEqual({
      offsetX: 'temp-Global.Shadow.Base-offsetX',
      offsetY: 'temp-Global.Shadow.Base-offsetY',
      blur: 'temp-Global.Shadow.Base-blur',
      spread: 'temp-Global.Shadow.Base-spread',
      color: 'temp-Global.Shadow.Base-color',
    })
  })

  it('assigns no id at all to a multi-layer or empty-array shadow token — not eligible for sync', () => {
    const idByPath = assignVariableIds(shadowBaseTokens)
    expect(idByPath.has('Global.Shadow.Stacked')).toBe(false)
    expect(idByPath.has('Global.Shadow.None')).toBe(false)
  })

  it('pass 1 creates 5 named sub-variables for a temp single-layer shadow token, with the right resolvedType each', () => {
    const idByPath = assignVariableIds(shadowBaseTokens)
    const { variables } = buildCreatePassPayload({
      baseTokens: shadowBaseTokens,
      brandTokensByName: { Base: shadowBaseTokens },
      idByPath,
      collectionId: 'coll-1',
      modeIdByBrand: { Base: 'm-base' },
    })

    // 10, not 5 — the reference token (Alias.Shadow.Base) is itself a temp
    // shadow token too and gets its own 5 variables created, same as any
    // other reference type (they alias to the target in pass 2, but still
    // need their own variables to exist first).
    expect(variables).toHaveLength(10)
    const literalVariables = variables.filter(v => v.name.startsWith('Global/Shadow/Base/'))
    expect(literalVariables.map(v => v.name)).toEqual([
      'Global/Shadow/Base/OffsetX',
      'Global/Shadow/Base/OffsetY',
      'Global/Shadow/Base/Blur',
      'Global/Shadow/Base/Spread',
      'Global/Shadow/Base/Color',
    ])
    expect(literalVariables.map(v => v.resolvedType)).toEqual(['FLOAT', 'FLOAT', 'FLOAT', 'FLOAT', 'COLOR'])
    expect(figmaShadowSubVariableName(shadowToken.path, 'color')).toBe('Global/Shadow/Base/Color')
  })

  it('pass 1 writes 5 literal mode-values for a single-layer shadow token, none for its reference or the excluded ones', () => {
    const idByPath = assignVariableIds(shadowBaseTokens)
    const { variableModeValues } = buildCreatePassPayload({
      baseTokens: shadowBaseTokens,
      brandTokensByName: { Base: shadowBaseTokens },
      idByPath,
      collectionId: 'coll-1',
      modeIdByBrand: { Base: 'm-base' },
    })

    expect(variableModeValues).toHaveLength(5)
    const byId = Object.fromEntries(variableModeValues.map(v => [v.variableId, v.value]))
    expect(byId['temp-Global.Shadow.Base-offsetY']).toBe(4)
    expect(byId['temp-Global.Shadow.Base-color']).toEqual({ r: 0, g: 0, b: 0, a: 0.15 })
  })

  it('pass 2 writes 5 alias mode-values for a shadow reference, each pointing at the matching sub-property of the target', () => {
    const idByPath = assignVariableIds(shadowBaseTokens)
    resolveTempIds(idByPath, {
      'temp-Global.Shadow.Base-offsetX': 'real-x',
      'temp-Global.Shadow.Base-offsetY': 'real-y',
      'temp-Global.Shadow.Base-blur': 'real-b',
      'temp-Global.Shadow.Base-spread': 'real-s',
      'temp-Global.Shadow.Base-color': 'real-c',
      'temp-Alias.Shadow.Base-offsetX': 'real-alias-x',
      'temp-Alias.Shadow.Base-offsetY': 'real-alias-y',
      'temp-Alias.Shadow.Base-blur': 'real-alias-b',
      'temp-Alias.Shadow.Base-spread': 'real-alias-s',
      'temp-Alias.Shadow.Base-color': 'real-alias-c',
    })

    const { variableModeValues } = buildAliasPassPayload({
      baseTokens: shadowBaseTokens,
      brandTokensByName: { Base: shadowBaseTokens },
      idByPath,
      modeIdByBrand: { Base: 'm-base' },
    })

    expect(variableModeValues).toHaveLength(5)
    const colorAlias = variableModeValues.find(v => v.variableId === 'real-alias-c')
    expect(colorAlias.value).toEqual({ type: 'VARIABLE_ALIAS', id: 'real-c' })
  })

  it('collectNewlyCreatedIds returns the whole 5-id object as one entry for a shadow token, and skips the excluded ones', () => {
    const idByPath = assignVariableIds(shadowBaseTokens)
    resolveTempIds(idByPath, {
      'temp-Global.Shadow.Base-offsetX': 'real-x',
      'temp-Global.Shadow.Base-offsetY': 'real-y',
      'temp-Global.Shadow.Base-blur': 'real-b',
      'temp-Global.Shadow.Base-spread': 'real-s',
      'temp-Global.Shadow.Base-color': 'real-c',
    })

    const created = collectNewlyCreatedIds([shadowToken, multiLayerToken, noneToken], idByPath)
    expect(created).toEqual([
      {
        path: shadowToken.path,
        variableId: { offsetX: 'real-x', offsetY: 'real-y', blur: 'real-b', spread: 'real-s', color: 'real-c' },
      },
    ])
  })
})

describe('border push (two-pass write payload)', () => {
  const colorPrimitive = {
    path: ['Alias', 'Border', 'Color', 'Grey'],
    type: 'color',
    value: {
      kind: 'literal',
      value: { colorSpace: 'srgb', components: [0.816, 0.816, 0.816], alpha: 1, hex: '#D0D0D0' },
    },
  }
  const widthPrimitive = {
    path: ['Alias', 'Border', 'Width', 'Base'],
    type: 'dimension',
    value: { kind: 'literal', value: { value: 0.125, unit: 'rem' } },
  }
  const stylePrimitive = {
    path: ['Alias', 'Border', 'Style', 'Solid'],
    type: 'string',
    value: { kind: 'literal', value: 'solid' },
  }
  const borderToken = {
    path: ['Alias', 'Border', 'Composite', 'Grey'],
    type: 'border',
    value: {
      kind: 'literal',
      value: {
        color: '{Alias.Border.Color.Grey}',
        width: '{Alias.Border.Width.Base}',
        style: '{Alias.Border.Style.Solid}',
      },
    },
  }
  const borderRefToken = {
    path: ['Tcs', 'Border', 'Composite', 'Grey'],
    type: 'border',
    value: { kind: 'reference', path: ['Alias', 'Border', 'Composite', 'Grey'] },
  }
  const borderBaseTokens = [colorPrimitive, widthPrimitive, stylePrimitive, borderToken, borderRefToken]

  it('assigns 3 temp sub-ids to a never-synced border token', () => {
    const idByPath = assignVariableIds(borderBaseTokens)
    expect(idByPath.get('Alias.Border.Composite.Grey')).toEqual({
      color: 'temp-Alias.Border.Composite.Grey-color',
      width: 'temp-Alias.Border.Composite.Grey-width',
      style: 'temp-Alias.Border.Composite.Grey-style',
    })
  })

  it('pass 1 creates 3 named sub-variables for a temp border token, with the right resolvedType each', () => {
    const idByPath = assignVariableIds(borderBaseTokens)
    const { variables } = buildCreatePassPayload({
      baseTokens: borderBaseTokens,
      brandTokensByName: { Base: borderBaseTokens },
      idByPath,
      collectionId: 'coll-1',
      modeIdByBrand: { Base: 'm-base' },
    })

    const borderVariables = variables.filter(v => v.name.startsWith('Alias/Border/Composite/Grey/'))
    expect(borderVariables.map(v => v.name)).toEqual([
      'Alias/Border/Composite/Grey/BorderColor',
      'Alias/Border/Composite/Grey/BorderWidth',
      'Alias/Border/Composite/Grey/BorderStyle',
    ])
    expect(borderVariables.map(v => v.resolvedType)).toEqual(['COLOR', 'FLOAT', 'STRING'])
    expect(figmaBorderSubVariableName(borderToken.path, 'width')).toBe('Alias/Border/Composite/Grey/BorderWidth')
  })

  it('pass 1 writes 3 literal mode-values for a border token, resolving its referenced color/width/style', () => {
    const idByPath = assignVariableIds(borderBaseTokens)
    const { variableModeValues } = buildCreatePassPayload({
      baseTokens: borderBaseTokens,
      brandTokensByName: { Base: borderBaseTokens },
      idByPath,
      collectionId: 'coll-1',
      modeIdByBrand: { Base: 'm-base' },
    })

    const byId = Object.fromEntries(variableModeValues.map(v => [v.variableId, v.value]))
    expect(byId['temp-Alias.Border.Composite.Grey-color']).toEqual({ r: 0.816, g: 0.816, b: 0.816, a: 1 })
    expect(byId['temp-Alias.Border.Composite.Grey-width']).toBe(2)
    expect(byId['temp-Alias.Border.Composite.Grey-style']).toBe('solid')
  })

  it('pass 2 writes 3 alias mode-values for a border reference, each pointing at the matching sub-property of the target', () => {
    const idByPath = assignVariableIds(borderBaseTokens)
    resolveTempIds(idByPath, {
      'temp-Alias.Border.Composite.Grey-color': 'real-c',
      'temp-Alias.Border.Composite.Grey-width': 'real-w',
      'temp-Alias.Border.Composite.Grey-style': 'real-s',
      'temp-Tcs.Border.Composite.Grey-color': 'real-alias-c',
      'temp-Tcs.Border.Composite.Grey-width': 'real-alias-w',
      'temp-Tcs.Border.Composite.Grey-style': 'real-alias-s',
    })

    const { variableModeValues } = buildAliasPassPayload({
      baseTokens: borderBaseTokens,
      brandTokensByName: { Base: borderBaseTokens },
      idByPath,
      modeIdByBrand: { Base: 'm-base' },
    })

    expect(variableModeValues).toHaveLength(3)
    const widthAlias = variableModeValues.find(v => v.variableId === 'real-alias-w')
    expect(widthAlias.value).toEqual({ type: 'VARIABLE_ALIAS', id: 'real-w' })
  })

  it('collectNewlyCreatedIds returns the whole 3-id object as one entry for a border token', () => {
    const idByPath = assignVariableIds(borderBaseTokens)
    resolveTempIds(idByPath, {
      'temp-Alias.Border.Composite.Grey-color': 'real-c',
      'temp-Alias.Border.Composite.Grey-width': 'real-w',
      'temp-Alias.Border.Composite.Grey-style': 'real-s',
    })

    const created = collectNewlyCreatedIds([borderToken], idByPath)
    expect(created).toEqual([
      { path: borderToken.path, variableId: { color: 'real-c', width: 'real-w', style: 'real-s' } },
    ])
  })
})

describe('findCollectionAndModes', () => {
  const meta = {
    variableCollections: {
      'VariableCollectionId:1': {
        id: 'VariableCollectionId:1',
        name: 'Tokens',
        modes: [
          { modeId: 'm1', name: 'Base' },
          { modeId: 'm2', name: 'Tcs' },
        ],
      },
    },
  }

  it('maps each brand name to its mode id by exact name match', () => {
    const { collectionId, modeIdByBrand } = findCollectionAndModes(meta, ['Tcs'])
    expect(collectionId).toBe('VariableCollectionId:1')
    expect(modeIdByBrand).toEqual({ Base: 'm1', Tcs: 'm2' })
  })

  it('throws if a brand has no matching Figma mode', () => {
    expect(() => findCollectionAndModes(meta, ['Unknown'])).toThrow(/No Figma mode named "Unknown"/)
  })

  it('throws if the file does not have exactly one variable collection', () => {
    expect(() => findCollectionAndModes({ variableCollections: {} }, [])).toThrow(/found 0/)
  })
})

describe('two-pass write payload', () => {
  const baseTokens = [
    {
      path: ['Global', 'White'],
      type: 'color',
      value: { kind: 'literal', value: { components: [1, 1, 1], alpha: 1 } },
      variableId: 'VariableID:1:1',
    },
    { path: ['Global', 'Spacing', 'Lg'], type: 'number', value: { kind: 'literal', value: 24 } }, // no variableId — new
    { path: ['Alias', 'Background'], type: 'color', value: { kind: 'reference', path: ['Global', 'White'] } }, // no variableId — new
  ]
  const brandTokensByName = {
    Base: baseTokens,
    Tcs: [
      { ...baseTokens[0], value: { kind: 'literal', value: { components: [0.9, 0.9, 0.9], alpha: 1 } } }, // brand override
      baseTokens[1],
      baseTokens[2],
    ],
  }

  it('assigns a temp id only to tokens without an existing variableId', () => {
    const idByPath = assignVariableIds(baseTokens)
    expect(idByPath.get('Global.White')).toBe('VariableID:1:1')
    expect(idByPath.get('Global.Spacing.Lg')).toBe('temp-Global.Spacing.Lg')
    expect(idByPath.get('Alias.Background')).toBe('temp-Alias.Background')
  })

  it('pass 1 creates only never-synced variables, once each, regardless of brand count', () => {
    const idByPath = assignVariableIds(baseTokens)
    const { variables } = buildCreatePassPayload({
      baseTokens,
      brandTokensByName,
      idByPath,
      collectionId: 'coll-1',
      modeIdByBrand: { Base: 'm-base', Tcs: 'm-tcs' },
    })

    expect(variables).toHaveLength(2)
    expect(variables.map(v => v.name)).toEqual(['Global/Spacing/Lg', 'Alias/Background'])
    expect(variables.every(v => v.action === 'CREATE')).toBe(true)
  })

  it('pass 1 writes literal mode-values for every brand, excluding references', () => {
    const idByPath = assignVariableIds(baseTokens)
    const { variableModeValues } = buildCreatePassPayload({
      baseTokens,
      brandTokensByName,
      idByPath,
      collectionId: 'coll-1',
      modeIdByBrand: { Base: 'm-base', Tcs: 'm-tcs' },
    })

    // Global.White (2 brands) + Global.Spacing.Lg (2 brands) = 4; Alias.Background is a reference, excluded.
    expect(variableModeValues).toHaveLength(4)
    expect(variableModeValues.every(v => v.value.type !== 'VARIABLE_ALIAS')).toBe(true)

    const tcsWhite = variableModeValues.find(v => v.variableId === 'VariableID:1:1' && v.modeId === 'm-tcs')
    expect(tcsWhite.value).toEqual({ r: 0.9, g: 0.9, b: 0.9, a: 1 })
  })

  it('pass 2 writes alias mode-values for every brand, resolving against Base regardless of which brand tree is passed', () => {
    const idByPath = assignVariableIds(baseTokens)
    resolveTempIds(idByPath, { 'temp-Global.Spacing.Lg': 'VariableID:9:1', 'temp-Alias.Background': 'VariableID:9:2' })

    const { variableModeValues } = buildAliasPassPayload({
      baseTokens,
      brandTokensByName,
      idByPath,
      modeIdByBrand: { Base: 'm-base', Tcs: 'm-tcs' },
    })

    expect(variableModeValues).toHaveLength(2) // Alias.Background in Base and Tcs
    for (const entry of variableModeValues) {
      expect(entry.variableId).toBe('VariableID:9:2')
      expect(entry.value).toEqual({ type: 'VARIABLE_ALIAS', id: 'VariableID:1:1' })
    }
  })

  it('resolveTempIds patches every occurrence of a temp id, not just the first', () => {
    const idByPath = assignVariableIds(baseTokens)
    resolveTempIds(idByPath, { 'temp-Global.Spacing.Lg': 'VariableID:9:1', 'temp-Alias.Background': 'VariableID:9:2' })

    expect(idByPath.get('Global.Spacing.Lg')).toBe('VariableID:9:1')
    expect(idByPath.get('Alias.Background')).toBe('VariableID:9:2')
    expect(idByPath.get('Global.White')).toBe('VariableID:1:1') // untouched — wasn't a temp id
  })

  it('collectNewlyCreatedIds returns only tokens that started without a variableId, with their resolved real id', () => {
    const idByPath = assignVariableIds(baseTokens)
    resolveTempIds(idByPath, { 'temp-Global.Spacing.Lg': 'VariableID:9:1', 'temp-Alias.Background': 'VariableID:9:2' })

    const created = collectNewlyCreatedIds(baseTokens, idByPath)
    expect(created).toEqual([
      { path: ['Global', 'Spacing', 'Lg'], variableId: 'VariableID:9:1' },
      { path: ['Alias', 'Background'], variableId: 'VariableID:9:2' },
    ])
  })
})

describe('figmaVariableName', () => {
  it('joins the token path with "/", matching Figma variable naming', () => {
    expect(figmaVariableName(['🔗 Alias', 'Color', 'Background'])).toBe('🔗 Alias/Color/Background')
  })
})

describe('buildNameIndex', () => {
  const meta = {
    variables: {
      'VariableID:1:1': { id: 'VariableID:1:1', name: 'Global/White', variableCollectionId: 'coll-1' },
      'VariableID:1:2': { id: 'VariableID:1:2', name: 'Global/Black', variableCollectionId: 'coll-2' }, // different collection
    },
  }

  it('maps variable name to id, scoped to the given collection', () => {
    expect(buildNameIndex(meta, 'coll-1')).toEqual(new Map([['Global/White', 'VariableID:1:1']]))
  })

  it('excludes variables from other collections', () => {
    expect(buildNameIndex(meta, 'coll-1').has('Global/Black')).toBe(false)
  })
})

describe('assignVariableIds path/name fallback match (docs/adr/0001-figma-variable-identity-key.md)', () => {
  const unsynced = { path: ['Global', 'Spacing', 'Lg'], type: 'number', value: { kind: 'literal', value: 24 } }

  it('links to an existing Figma variable of the same name instead of minting a temp id', () => {
    const nameIndex = new Map([['Global/Spacing/Lg', 'VariableID:9:9']])
    const idByPath = assignVariableIds([unsynced], nameIndex)
    expect(idByPath.get('Global.Spacing.Lg')).toBe('VariableID:9:9')
  })

  it('falls through to a temp id when no existing variable matches the name', () => {
    const idByPath = assignVariableIds([unsynced], new Map([['Some/Other/Name', 'VariableID:9:9']]))
    expect(idByPath.get('Global.Spacing.Lg')).toBe('temp-Global.Spacing.Lg')
  })

  it('an existing $extensions variableId always wins over a name match — id identity is never overridden by a name coincidence', () => {
    const withId = { ...unsynced, variableId: 'VariableID:1:1' }
    const idByPath = assignVariableIds([withId], new Map([['Global/Spacing/Lg', 'VariableID:9:9']]))
    expect(idByPath.get('Global.Spacing.Lg')).toBe('VariableID:1:1')
  })

  it('a name-fallback-linked token is excluded from the CREATE pass — this is the bug a real sandbox run caught: re-running against an already-populated file 400ed on a duplicate name', () => {
    const nameIndex = new Map([['Global/Spacing/Lg', 'VariableID:9:9']])
    const idByPath = assignVariableIds([unsynced], nameIndex)
    const { variables } = buildCreatePassPayload({
      baseTokens: [unsynced],
      brandTokensByName: { Base: [unsynced] },
      idByPath,
      collectionId: 'coll-1',
      modeIdByBrand: { Base: 'm-base' },
    })
    expect(variables).toEqual([])
  })

  it('collectNewlyCreatedIds still reports a name-fallback-linked token — GitHub never had this id committed, so it still needs the backfill commit', () => {
    const nameIndex = new Map([['Global/Spacing/Lg', 'VariableID:9:9']])
    const idByPath = assignVariableIds([unsynced], nameIndex)
    expect(collectNewlyCreatedIds([unsynced], idByPath)).toEqual([
      { path: unsynced.path, variableId: 'VariableID:9:9' },
    ])
  })
})
