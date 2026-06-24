import { hasValue } from '../has-value'

describe('hasValue', () => {
  test('returns false for undefined', () => {
    expect(hasValue(undefined)).toBe(false)
  })

  test('returns false for null', () => {
    expect(hasValue(null)).toBe(false)
  })

  test('returns false for empty string', () => {
    expect(hasValue('')).toBe(false)
  })

  test('returns false for NaN', () => {
    expect(hasValue(Number.NaN)).toBe(false)
  })

  test('returns true for a non-empty string', () => {
    expect(hasValue('primary')).toBe(true)
  })

  test('returns true for zero', () => {
    expect(hasValue(0)).toBe(true)
  })

  test('returns true for false', () => {
    expect(hasValue(false)).toBe(true)
  })

  test('returns true for an object', () => {
    expect(hasValue({})).toBe(true)
  })
})
