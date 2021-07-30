import { isMaxLength, isMinLength } from './string.validators'

describe('string', () => {
  test('isMaxLength', () => {
    const validator = isMaxLength(3)
    expect(validator(undefined)).toBe(true)
    expect(validator(null)).toBe(true)
    expect(validator('')).toBe(true)
    expect(validator('134')).toBe(true)
    expect(validator('1234')).toBe(false)
  })

  test('isMinLength', () => {
    const validator = isMinLength(3)
    expect(validator(undefined)).toBe(true)
    expect(validator(null)).toBe(true)
    expect(validator('')).toBe(true)
    expect(validator('134')).toBe(true)
    expect(validator('12')).toBe(false)
  })
})
