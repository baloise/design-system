import { isEmail, isPhone, matchesRegex } from './regex.validators'

describe('regex', () => {
  test('matchesRegex', () => {
    const validator = matchesRegex(new RegExp('^\\d+$'))
    expect(validator('3')).toBe(true)
    expect(validator(undefined)).toBe(true)
    expect(validator(null)).toBe(true)
    expect(validator('')).toBe(true)
  })

  test('isEmail', () => {
    const validator = isEmail()
    expect(validator('peter@baloise.ch')).toBe(true)
    expect(validator('peter@baloise')).toBe(false)
    expect(validator('peter@baloise.')).toBe(false)
    expect(validator('@baloise.ch')).toBe(false)
    expect(validator('peterbaloise.ch')).toBe(false)
  })

  test('isPhone', () => {
    const validator = isPhone()
    expect(validator('0')).toBe(true)
    expect(validator('a')).toBe(false)
  })
})
