import { describe, expect, it } from 'vitest'
import { formatValue, getColorHex, hexToColorValue } from './format'

const colorValue = { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' }

describe('getColorHex', () => {
  it('returns the hex for a DTCG color value', () => {
    expect(getColorHex(colorValue)).toBe('#FFFFFF')
  })

  it('returns null for a plain object without a hex field', () => {
    expect(getColorHex({ foo: 'bar' })).toBeNull()
  })

  it('returns null for primitives', () => {
    expect(getColorHex(42)).toBeNull()
    expect(getColorHex('hello')).toBeNull()
    expect(getColorHex(undefined)).toBeNull()
  })
})

describe('hexToColorValue', () => {
  it('converts a hex string into a DTCG color value, defaulting colorSpace and alpha', () => {
    expect(hexToColorValue('#FF0000')).toEqual({ colorSpace: 'srgb', components: [1, 0, 0], alpha: 1, hex: '#FF0000' })
  })

  it('normalizes casing and preserves colorSpace/alpha from a previous value', () => {
    const previous = { colorSpace: 'display-p3', components: [1, 1, 1], alpha: 0.5, hex: '#FFFFFF' }
    expect(hexToColorValue('#00ff00', previous)).toEqual({
      colorSpace: 'display-p3',
      components: [0, 1, 0],
      alpha: 0.5,
      hex: '#00FF00',
    })
  })

  it('returns null for text that is not a 6-digit hex color', () => {
    expect(hexToColorValue('red')).toBeNull()
    expect(hexToColorValue('#FFF')).toBeNull()
    expect(hexToColorValue('')).toBeNull()
  })
})

describe('formatValue', () => {
  it('formats undefined and null as an em dash', () => {
    expect(formatValue(undefined)).toBe('—')
    expect(formatValue(null)).toBe('—')
  })

  it('formats numbers and strings as themselves', () => {
    expect(formatValue(0.5)).toBe('0.5')
    expect(formatValue('0 1px 2px rgba(0,0,0,0.1)')).toBe('0 1px 2px rgba(0,0,0,0.1)')
  })

  it('formats a DTCG color value as its hex', () => {
    expect(formatValue(colorValue)).toBe('#FFFFFF')
  })

  it('falls back to JSON.stringify for other object shapes', () => {
    expect(formatValue({ foo: 'bar' })).toBe('{"foo":"bar"}')
  })
})
