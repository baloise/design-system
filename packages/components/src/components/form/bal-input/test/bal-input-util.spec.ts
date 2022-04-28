import { formatClaim, formatOffer, formatPolicy } from '../bal-input-util'

describe('bal-input-util testing:', () => {
  describe('formatClaim', () => {
    test('full entry:', () => {
      const result = formatClaim('73001217169')
      expect(result).toStrictEqual('73/001217/16.9')
    })
    test('empty:', () => {
      const result = formatClaim('')
      expect(result).toStrictEqual('')
    })
    test('partial 2 characters:', () => {
      const result = formatClaim('73')
      expect(result).toStrictEqual('73')
    })
    test('partial 3 characters:', () => {
      const result = formatClaim('730')
      expect(result).toStrictEqual('73/0')
    })
    test('partial 9 characters:', () => {
      const result = formatClaim('730012171')
      expect(result).toStrictEqual('73/001217/1')
    })
    test('partial 12 characters:', () => {
      const result = formatClaim('730012171699')
      expect(result).toStrictEqual('73/001217/16.9')
    })
  })
  describe('formatOffer', () => {
    test('full entry:', () => {
      const result = formatOffer('987654321')
      expect(result).toStrictEqual('98/7.654.321')
    })
    test('empty:', () => {
      const result = formatOffer('')
      expect(result).toStrictEqual('')
    })
    test('3 charters:', () => {
      const result = formatOffer('987')
      expect(result).toStrictEqual('98/7')
    })
    test('4 charters:', () => {
      const result = formatOffer('9876')
      expect(result).toStrictEqual('98/7.6')
    })
    test('6 charters:', () => {
      const result = formatOffer('987654')
      expect(result).toStrictEqual('98/7.654')
    })
    test('7 charters:', () => {
      const result = formatOffer('9876543')
      expect(result).toStrictEqual('98/7.654.3')
    })
    test('10 charters:', () => {
      const result = formatOffer('9876543219')
      expect(result).toStrictEqual('98/7.654.321')
    })
  })
  describe('formatPolicy', () => {
    test('full entry:', () => {
      const result = formatPolicy('98765432')
      expect(result).toStrictEqual('09/8.765.432')
    })
    test('empty:', () => {
      const result = formatPolicy('')
      expect(result).toStrictEqual('')
    })
    test('full entry:', () => {
      const result = formatPolicy('098765432')
      expect(result).toStrictEqual('09/8.765.432')
    })
    test('9 characters without starting 0:', () => {
      const result = formatPolicy('987654327')
      expect(result).toStrictEqual('09/8.765.432')
    })
    test('10 characters without starting 0:', () => {
      const result = formatPolicy('0987654327')
      expect(result).toStrictEqual('09/8.765.432')
    })
  })
})
