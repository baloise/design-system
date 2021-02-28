import { isCustom } from './custom.validators'

describe('custom', () => {
  test('isCutom', () => {
    const validator = isCustom(value => value > 2)
    expect(validator(3)).toBe(true)
    expect(validator(2)).toBe(false)
  })
})
