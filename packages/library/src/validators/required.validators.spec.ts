import { isRequired, isRequiredTrue } from './required.validators'

describe('required', () => {
  test('isRequired', () => {
    const validator = isRequired()
    expect(validator('Foo')).toBe(true)
    expect(validator(0)).toBe(true)
    expect(validator(true)).toBe(true)
    expect(validator(false)).toBe(true)
    expect(validator('')).toBe(false)
    expect(validator(null)).toBe(false)
    expect(validator(undefined)).toBe(false)
    expect(validator([])).toBe(false)
    expect(validator({})).toBe(false)
  })
  test('isRequiredTrue', () => {
    const validator = isRequiredTrue()
    expect(validator(true)).toBe(true)
    expect(validator(false)).toBe(false)
    expect(validator(undefined)).toBe(false)
    expect(validator(null)).toBe(false)
  })
})
