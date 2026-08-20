import { describe, expect, it } from 'vitest'
import {
  dtcgColorFromFigma,
  dtcgResponsiveDimensionFromFigma,
  dtcgTypeFor,
  flattenFigmaId,
  fontWeightNumberFromKeyword,
  isColorEqual,
  isFigmaAlias,
  isLiteralValueEqual,
  isResponsiveDimensionFigmaId,
  pathFromFigmaVariableName,
} from './figma-map'

describe('dtcgTypeFor', () => {
  it('maps every known Figma resolvedType to its DTCG $type', () => {
    expect(dtcgTypeFor('COLOR')).toBe('color')
    expect(dtcgTypeFor('FLOAT')).toBe('number')
    expect(dtcgTypeFor('STRING')).toBe('string')
    expect(dtcgTypeFor('BOOLEAN')).toBe('boolean')
  })

  it('throws loudly on an unrecognized resolvedType', () => {
    expect(() => dtcgTypeFor('EFFECT')).toThrow(/Unsupported Figma resolvedType/)
  })
})

describe('fontWeightNumberFromKeyword', () => {
  it('maps every known DTCG font-weight keyword back to its number', () => {
    expect(fontWeightNumberFromKeyword('Thin')).toBe(100)
    expect(fontWeightNumberFromKeyword('Regular')).toBe(400)
    expect(fontWeightNumberFromKeyword('Bold')).toBe(700)
    expect(fontWeightNumberFromKeyword('Extra-Black')).toBe(950)
  })

  it('is exact-case — a differently-cased or -spaced variant does not match', () => {
    expect(fontWeightNumberFromKeyword('bold')).toBeUndefined()
    expect(fontWeightNumberFromKeyword('SemiBold')).toBeUndefined()
  })

  it('returns undefined for an unrecognized string or a non-string value', () => {
    expect(fontWeightNumberFromKeyword('Not A Weight')).toBeUndefined()
    expect(fontWeightNumberFromKeyword(700)).toBeUndefined()
  })
})

describe('dtcgColorFromFigma', () => {
  it('round-trips white opaque', () => {
    expect(dtcgColorFromFigma({ r: 1, g: 1, b: 1, a: 1 })).toEqual({
      colorSpace: 'srgb',
      components: [1, 1, 1],
      alpha: 1,
      hex: '#FFFFFF',
    })
  })

  it('round-trips black opaque', () => {
    expect(dtcgColorFromFigma({ r: 0, g: 0, b: 0, a: 1 })).toEqual({
      colorSpace: 'srgb',
      components: [0, 0, 0],
      alpha: 1,
      hex: '#000000',
    })
  })

  it('keeps hex to 6 digits regardless of alpha — alpha stays its own field, matching real token data', () => {
    expect(dtcgColorFromFigma({ r: 0, g: 0, b: 0, a: 0.1 })).toEqual({
      colorSpace: 'srgb',
      components: [0, 0, 0],
      alpha: 0.1,
      hex: '#000000',
    })
  })
})

describe('isColorEqual', () => {
  it('treats floating-point drift within the same hex byte as equal', () => {
    expect(isColorEqual({ r: 0.5, g: 0.5, b: 0.5, a: 1 }, { r: 0.5000000074505806, g: 0.5, b: 0.5, a: 1 })).toBe(true)
  })

  it('treats a real RGB change as unequal', () => {
    expect(isColorEqual({ r: 0.5, g: 0.5, b: 0.5, a: 1 }, { r: 0.6, g: 0.5, b: 0.5, a: 1 })).toBe(false)
  })

  it('treats a real alpha change as unequal even when RGB matches', () => {
    expect(isColorEqual({ r: 0, g: 0, b: 0, a: 0.1 }, { r: 0, g: 0, b: 0, a: 0.5 })).toBe(false)
  })

  it('treats alpha drift within the same byte as equal', () => {
    expect(isColorEqual({ r: 0, g: 0, b: 0, a: 0.1 }, { r: 0, g: 0, b: 0, a: 0.1000000014901161 })).toBe(true)
  })
})

describe('isLiteralValueEqual', () => {
  it('compares already-converted DTCG color values by hex + alpha', () => {
    expect(
      isLiteralValueEqual(
        'color',
        dtcgColorFromFigma({ r: 0.5, g: 0.5, b: 0.5, a: 1 }),
        dtcgColorFromFigma({ r: 0.5000000074505806, g: 0.5, b: 0.5, a: 1 }),
      ),
    ).toBe(true)
    expect(
      isLiteralValueEqual(
        'color',
        dtcgColorFromFigma({ r: 0.5, g: 0.5, b: 0.5, a: 1 }),
        dtcgColorFromFigma({ r: 0.6, g: 0.5, b: 0.5, a: 1 }),
      ),
    ).toBe(false)
    expect(
      isLiteralValueEqual(
        'color',
        dtcgColorFromFigma({ r: 0, g: 0, b: 0, a: 0.1 }),
        dtcgColorFromFigma({ r: 0, g: 0, b: 0, a: 0.5 }),
      ),
    ).toBe(false)
  })

  it('uses exact equality for non-color types', () => {
    expect(isLiteralValueEqual('number', 4, 4)).toBe(true)
    expect(isLiteralValueEqual('number', 4, 5)).toBe(false)
    expect(isLiteralValueEqual('string', 'a', 'a')).toBe(true)
    expect(isLiteralValueEqual('boolean', true, false)).toBe(false)
  })

  // docs/plans/responsive-dimension-token-plan.md — a synthetic dtcgType this codebase's real
  // $type never uses (responsive dimension tokens stay $type: "dimension"), passed explicitly by
  // figma-pull.ts when it already knows it's comparing two {mobile, tablet, desktop} maps.
  it('compares a responsive dimension value field-by-field, literal or reference either side', () => {
    expect(
      isLiteralValueEqual(
        'responsiveDimension',
        { mobile: { value: 16, unit: 'px' }, tablet: { value: 24, unit: 'px' }, desktop: { value: 32, unit: 'px' } },
        { mobile: { value: 16, unit: 'px' }, tablet: { value: 24, unit: 'px' }, desktop: { value: 32, unit: 'px' } },
      ),
    ).toBe(true)
    expect(
      isLiteralValueEqual(
        'responsiveDimension',
        { mobile: { value: 16, unit: 'px' }, tablet: { value: 24, unit: 'px' }, desktop: { value: 32, unit: 'px' } },
        { mobile: { value: 16, unit: 'px' }, tablet: { value: 24, unit: 'px' }, desktop: { value: 40, unit: 'px' } },
      ),
    ).toBe(false)
    expect(
      isLiteralValueEqual(
        'responsiveDimension',
        {
          mobile: '{🌐 Global.📏 Dimension.Space.16}',
          tablet: { value: 24, unit: 'px' },
          desktop: { value: 32, unit: 'px' },
        },
        {
          mobile: '{🌐 Global.📏 Dimension.Space.16}',
          tablet: { value: 24, unit: 'px' },
          desktop: { value: 32, unit: 'px' },
        },
      ),
    ).toBe(true)
  })
})

describe('pathFromFigmaVariableName', () => {
  it('splits a slash-joined Figma variable name into a path array', () => {
    expect(pathFromFigmaVariableName('🌐 Global/🌈 Color/White')).toEqual(['🌐 Global', '🌈 Color', 'White'])
  })
})

describe('isFigmaAlias', () => {
  it('recognizes a VARIABLE_ALIAS mode-value', () => {
    expect(isFigmaAlias({ type: 'VARIABLE_ALIAS', id: 'VariableID:1:1' })).toBe(true)
  })

  it('rejects a literal value', () => {
    expect(isFigmaAlias({ r: 1, g: 1, b: 1, a: 1 })).toBe(false)
    expect(isFigmaAlias('white')).toBe(false)
    expect(isFigmaAlias(4)).toBe(false)
  })
})

describe('isResponsiveDimensionFigmaId', () => {
  it('recognizes a {mobile, tablet, desktop} id set', () => {
    expect(isResponsiveDimensionFigmaId({ mobile: 'v1', tablet: 'v2', desktop: 'v3' })).toBe(true)
  })

  it('rejects a plain string id, and a differently-shaped composite id', () => {
    expect(isResponsiveDimensionFigmaId('VariableID:1:1')).toBe(false)
    expect(isResponsiveDimensionFigmaId({ color: 'v1', width: 'v2', style: 'v3' })).toBe(false)
    expect(isResponsiveDimensionFigmaId({ mobile: 'v1', tablet: 'v2' })).toBe(false)
  })
})

describe('flattenFigmaId', () => {
  it('flattens a responsive dimension figmaId object into 3 tagged entries', () => {
    expect(flattenFigmaId({ mobile: 'v1', tablet: 'v2', desktop: 'v3' })).toEqual([
      { id: 'v1', subProperty: 'mobile' },
      { id: 'v2', subProperty: 'tablet' },
      { id: 'v3', subProperty: 'desktop' },
    ])
  })

  it('still distinguishes a border id set (no mobile key) from a responsive dimension one', () => {
    expect(flattenFigmaId({ color: 'v1', width: 'v2', style: 'v3' })).toEqual([
      { id: 'v1', subProperty: 'color' },
      { id: 'v2', subProperty: 'width' },
      { id: 'v3', subProperty: 'style' },
    ])
  })
})

describe('dtcgResponsiveDimensionFromFigma', () => {
  it('reconstructs 3 breakpoint literals, converting each back to its own local unit', () => {
    expect(
      dtcgResponsiveDimensionFromFigma({ mobile: 16, tablet: 24, desktop: 384 }, sub =>
        sub === 'desktop' ? 'rem' : 'px',
      ),
    ).toEqual({
      mobile: { value: 16, unit: 'px' },
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 24, unit: 'rem' }, // 384px / 16 = 24rem
    })
  })

  it('returns null when any breakpoint value is not a number', () => {
    expect(dtcgResponsiveDimensionFromFigma({ mobile: 16, tablet: 24, desktop: 'nope' }, () => 'px')).toBeNull()
  })
})
