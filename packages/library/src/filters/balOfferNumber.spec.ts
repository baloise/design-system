import { balOfferNumber } from './balOfferNumber'

describe('balOfferNumber', () => {
  test('should format some number correctly', () => {
    expect(balOfferNumber('987654321')).toEqual('98/7.654.321')
  })
  test('should format some number with a variant correctly', () => {
    expect(balOfferNumber('987654321', '15')).toEqual('98/7.654.321 / 15')
  })
  test('should format some number with a null variant correctly', () => {
    expect(balOfferNumber('987654321', undefined)).toEqual('98/7.654.321')
  })
  test('should format undefined correctly as empty string', () => {
    expect(balOfferNumber(undefined)).toEqual('')
  })
})
