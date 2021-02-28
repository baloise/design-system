import { isMin, isMax, isMonetaryNumber } from './number.validators'

describe('number', () => {
  test('isMin', () => {
    expect(isMin(0)(0)).toBe(true)
    expect(isMin(10)(9)).toBe(false)
  })

  test('isMax', () => {
    expect(isMax(0)(0)).toBe(true)
    expect(isMax(10)(11)).toBe(false)
  })

  test('isMonetaryNumber', () => {
    const validator = isMonetaryNumber()
    expect(validator('0')).toBe(true)
    expect(validator(`1'000.99`)).toBe(true)
    expect(validator(10)).toBe(true)
  })
})
