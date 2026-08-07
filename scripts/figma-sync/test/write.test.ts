import { describe, expect, it } from 'vitest'
import { findCollectionAndModes } from '../lib/figma.mjs'
import { figmaValueFor, resolvedTypeFor } from '../lib/figma-value.mjs'
import { assignVariableIds, buildAliasPassPayload, buildCreatePassPayload, collectNewlyCreatedIds, figmaVariableName, resolveTempIds } from '../lib/write.mjs'

describe('figma-value', () => {
  it('maps a DTCG color to a Figma RGBA value (components already 0-1 srgb floats)', () => {
    expect(figmaValueFor('color', { colorSpace: 'srgb', components: [1, 0.5, 0], alpha: 0.8, hex: '#FF8000' })).toEqual({
      r: 1,
      g: 0.5,
      b: 0,
      a: 0.8,
    })
  })

  it('passes number/string/boolean straight through', () => {
    expect(figmaValueFor('number', 16)).toBe(16)
    expect(figmaValueFor('string', '0 2px 8px rgba(0,0,0,0.1)')).toBe('0 2px 8px rgba(0,0,0,0.1)')
    expect(figmaValueFor('boolean', true)).toBe(true)
  })

  it('fails loudly on an unmapped $type instead of guessing', () => {
    expect(() => figmaValueFor('dimension', '1rem')).toThrow(/Unsupported token \$type "dimension"/)
  })

  it('maps $type to the matching Figma resolvedType', () => {
    expect(resolvedTypeFor('color')).toBe('COLOR')
    expect(resolvedTypeFor('number')).toBe('FLOAT')
    expect(resolvedTypeFor('string')).toBe('STRING')
    expect(resolvedTypeFor('boolean')).toBe('BOOLEAN')
  })
})

describe('findCollectionAndModes', () => {
  const meta = {
    variableCollections: {
      'VariableCollectionId:1': { id: 'VariableCollectionId:1', name: 'Tokens', modes: [{ modeId: 'm1', name: 'Base' }, { modeId: 'm2', name: 'Tcs' }] },
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
    { path: ['Global', 'White'], type: 'color', value: { kind: 'literal', value: { components: [1, 1, 1], alpha: 1 } }, variableId: 'VariableID:1:1' },
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
