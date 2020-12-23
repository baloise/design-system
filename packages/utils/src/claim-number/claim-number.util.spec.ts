import { toClaimNumber } from './claim-number.util'

describe('ClaimNumberUtils', () => {
  test('should format a claim number correctly', () => {
    expect(toClaimNumber('73001217169')).toBe('73/001217/16.9')
  })
  test('should format null as empty string', () => {
    expect(toClaimNumber(null)).toBe('')
  })
  test('should output a number with a wrong format raw', () => {
    expect(toClaimNumber('123')).toBe('123')
  })
  test('should format a claim number with a sign postfix correctly', () => {
    expect(toClaimNumber('7300772816X')).toBe('73/007728/16.X')
  })
})
