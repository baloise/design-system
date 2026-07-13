import { isIsoDate } from '../is-iso-date'

describe('isIsoDate', () => {
  test('returns true for a valid ISO date', () => {
    expect(isIsoDate('2024-01-15')).toBe(true)
  })

  test('returns true for the first day of the year', () => {
    expect(isIsoDate('2024-01-01')).toBe(true)
  })

  test('returns true for a leap-year date (Feb 29)', () => {
    expect(isIsoDate('2024-02-29')).toBe(true)
  })

  test('returns false for Feb 29 in a non-leap year', () => {
    expect(isIsoDate('2023-02-29')).toBe(false)
  })

  test('returns false for an overflowing day that auto-corrects', () => {
    expect(isIsoDate('2024-02-30')).toBe(false)
  })

  test('returns false for an out-of-range month', () => {
    expect(isIsoDate('2024-13-01')).toBe(false)
  })

  test('returns false for a zero month', () => {
    expect(isIsoDate('2024-00-10')).toBe(false)
  })

  test('returns false for a non-zero-padded date', () => {
    expect(isIsoDate('2024-1-5')).toBe(false)
  })

  test('returns false for a different separator', () => {
    expect(isIsoDate('2024/01/15')).toBe(false)
  })

  test('returns false for a reversed format', () => {
    expect(isIsoDate('15-01-2024')).toBe(false)
  })

  test('returns false for a datetime string', () => {
    expect(isIsoDate('2024-01-15T00:00:00Z')).toBe(false)
  })

  test('returns false for a non-date string', () => {
    expect(isIsoDate('not-a-date')).toBe(false)
  })

  test('returns false for an empty string', () => {
    expect(isIsoDate('')).toBe(false)
  })
})
