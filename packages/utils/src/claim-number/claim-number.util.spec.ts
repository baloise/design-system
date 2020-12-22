import { claimNumber } from './claim-number.util'

describe('ClaimNumberUtils', () => {
  test('should format a claim number correctly', () => {
    expect(claimNumber.format('73001217169')).toBe('73/001217/16.9')
  })
  test('should format null as empty string', () => {
    expect(claimNumber.format(null)).toBe('')
  })
  test('should output a number with a wrong format raw', () => {
    expect(claimNumber.format('123')).toBe('123')
  })
  test('should format a claim number with a sign postfix correctly', () => {
    expect(claimNumber.format('7300772816X')).toBe('73/007728/16.X')
  })
})
