import { balCapitalize } from './balCapitalize'

describe('balCapitalize', () => {
  it('should be able to handle null and undefined', () => {
    expect(balCapitalize(null)).toBe('')
    expect(balCapitalize(undefined)).toBe('')
  })

  it('should capitalize strings', () => {
    expect(balCapitalize('')).toBe('')
    expect(balCapitalize('a')).toBe('A')
    expect(balCapitalize('ab')).toBe('Ab')
    expect(balCapitalize('Ab')).toBe('Ab')
    expect(balCapitalize('A')).toBe('A')
    expect(balCapitalize('5')).toBe('5')
    expect(balCapitalize('5abc')).toBe('5abc')
    expect(balCapitalize('-')).toBe('-')
  })
})
