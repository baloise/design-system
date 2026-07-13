import { isValueEmpty } from '../is-value-empty'

describe('isValueEmpty', () => {
  test('returns true for undefined', () => {
    expect(isValueEmpty(undefined)).toBe(true)
  })

  test('returns true for null', () => {
    expect(isValueEmpty(null)).toBe(true)
  })

  test('returns true for an empty string', () => {
    expect(isValueEmpty('')).toBe(true)
  })

  test('returns true for NaN', () => {
    expect(isValueEmpty(Number.NaN)).toBe(true)
  })

  test('returns false for a non-empty string', () => {
    expect(isValueEmpty('primary')).toBe(false)
  })

  test('returns false for a whitespace string', () => {
    expect(isValueEmpty(' ')).toBe(false)
  })

  test('returns false for zero', () => {
    expect(isValueEmpty(0)).toBe(false)
  })

  test('returns false for false', () => {
    expect(isValueEmpty(false)).toBe(false)
  })

  test('returns false for an object', () => {
    expect(isValueEmpty({})).toBe(false)
  })

  test('returns false for an empty array', () => {
    expect(isValueEmpty([])).toBe(false)
  })
})
