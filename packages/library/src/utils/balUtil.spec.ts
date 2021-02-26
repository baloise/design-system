import { areArraysEqual } from './balUtil'

describe('balUtil', () => {
  test('should tell if the arrays are equal', () => {
    expect(areArraysEqual([], [])).toBe(true)
    expect(areArraysEqual([1], [1])).toBe(true)
    expect(areArraysEqual(['1'], ['1'])).toBe(true)
    expect(areArraysEqual(['1', '2'], ['2', '1'])).toBe(true)
    expect(areArraysEqual(['4', '10'], ['10', '4'])).toBe(true)
    expect(areArraysEqual([2, 1, 0.4], [1, 2, 0.4])).toBe(true)
    expect(areArraysEqual([2, 1, 0.4], [1, 3, 0.4])).toBe(false)
  })
})
