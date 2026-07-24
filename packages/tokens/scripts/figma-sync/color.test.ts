import { describe, expect, it } from 'vitest'

import { figmaColorToTokenValue } from './color.js'

describe('figmaColorToTokenValue', () => {
  it('converts a fully opaque color to hex and preserves float components', () => {
    expect(figmaColorToTokenValue({ r: 1, g: 1, b: 1, a: 1 })).toEqual({
      colorSpace: 'srgb',
      components: [1, 1, 1],
      alpha: 1,
      hex: '#FFFFFF',
    })
  })

  it('rounds fractional channels to the nearest hex byte', () => {
    const result = figmaColorToTokenValue({
      r: 0.9882352948188782,
      g: 0.9098039269447327,
      b: 0.9019607901573181,
      a: 1,
    })
    expect(result.hex).toBe('#FCE8E6')
  })

  it('preserves alpha for translucent colors', () => {
    expect(figmaColorToTokenValue({ r: 0, g: 0, b: 0, a: 0.5 }).alpha).toBe(0.5)
  })
})
