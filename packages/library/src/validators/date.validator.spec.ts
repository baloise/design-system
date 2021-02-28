import { isDate } from './date.validators'

describe('date', () => {
  test('isDate', () => {
    const validator = isDate()
    expect(validator(new Date(2000, 0, 1))).toBe(true)
    expect(validator('2000-01-01')).toBe(true)
    expect(validator('2000-0101')).toBe(false)
    expect(validator(undefined)).toBe(false)
    expect(validator(null)).toBe(false)
    expect(validator(1)).toBe(false)
  })
})
