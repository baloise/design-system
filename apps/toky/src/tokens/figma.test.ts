import { afterEach, describe, expect, it, vi } from 'vitest'
import { getFigmaVariables } from './figma'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getFigmaVariables', () => {
  it('snaps float32 round-trip noise on FLOAT variables', async () => {
    const meta = {
      variables: {
        lineHeight: {
          id: 'lineHeight',
          name: 'Global/Font/LineHeight/2',
          variableCollectionId: 'c1',
          resolvedType: 'FLOAT',
          valuesByMode: { m1: 1.2999999523162842 },
          scopes: [],
          description: '',
        },
        opacity: {
          id: 'opacity',
          name: 'Global/Elevation/Opacity/30',
          variableCollectionId: 'c1',
          resolvedType: 'FLOAT',
          valuesByMode: { m1: 0.30000001192092896 },
          scopes: [],
          description: '',
        },
        // An aliased FLOAT value must be left untouched — it's not a number.
        aliased: {
          id: 'aliased',
          name: 'Alias/Some/Float',
          variableCollectionId: 'c1',
          resolvedType: 'FLOAT',
          valuesByMode: { m1: { type: 'VARIABLE_ALIAS', id: 'lineHeight' } },
          scopes: [],
          description: '',
        },
        // A non-FLOAT variable's numeric-looking payload (e.g. a color channel) must be untouched.
        color: {
          id: 'color',
          name: 'Global/Color/Brand',
          variableCollectionId: 'c1',
          resolvedType: 'COLOR',
          valuesByMode: { m1: { r: 0.30000001192092896, g: 0, b: 0, a: 1 } },
          scopes: [],
          description: '',
        },
      },
      variableCollections: {},
    }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ meta }), { status: 200 })))

    const result = await getFigmaVariables('file-key', 'token')

    expect(result.variables.lineHeight.valuesByMode.m1).toBe(1.3)
    expect(result.variables.opacity.valuesByMode.m1).toBe(0.3)
    expect(result.variables.aliased.valuesByMode.m1).toEqual({ type: 'VARIABLE_ALIAS', id: 'lineHeight' })
    expect(result.variables.color.valuesByMode.m1).toEqual({ r: 0.30000001192092896, g: 0, b: 0, a: 1 })
  })
})
