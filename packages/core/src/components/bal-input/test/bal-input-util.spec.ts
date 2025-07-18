import {
  formatBeEnterpriseNumber,
  formatBeIBAN,
  formatClaim,
  formatOffer,
  formatPolicy,
  formatVehicleRegistrationNumber,
} from '../bal-input-util'

describe('bal-input-util testing:', () => {
  describe('formatVehicleRegistrationNumber', () => {
    test('full entry:', () => {
      const result = formatVehicleRegistrationNumber('123456789')
      expect(result).toStrictEqual('123.456.789')
    })
    test('empty:', () => {
      const result = formatVehicleRegistrationNumber('')
      expect(result).toStrictEqual('')
    })
    test('partial 2 characters:', () => {
      const result = formatVehicleRegistrationNumber('73')
      expect(result).toStrictEqual('73')
    })
    test('partial 3 characters:', () => {
      const result = formatVehicleRegistrationNumber('730')
      expect(result).toStrictEqual('730')
    })
    test('partial 4 characters:', () => {
      const result = formatVehicleRegistrationNumber('7303')
      expect(result).toStrictEqual('730.3')
    })
    test('partial 9 characters:', () => {
      const result = formatVehicleRegistrationNumber('123456789')
      expect(result).toStrictEqual('123.456.789')
    })
    test('partial 12 characters:', () => {
      const result = formatVehicleRegistrationNumber('123456789012')
      expect(result).toStrictEqual('123.456.789.012')
    })
    test('partial 13 characters:', () => {
      const result = formatVehicleRegistrationNumber('1234567890123')
      expect(result).toStrictEqual('123.456.789.012')
    })
  })
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
    test('claim number with a sign postfix correctly X', () => {
      const result = formatClaim('7300772816X')
      expect(result).toStrictEqual('73/007728/16.X')
    })
    test('claim number with a sign postfix correctly x', () => {
      const result = formatClaim('7300772816x')
      expect(result).toStrictEqual('73/007728/16.X')
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
      const result = formatPolicy('9087654321')
      expect(result).toStrictEqual('90/8.765.432-1')
    })
    test('empty:', () => {
      const result = formatPolicy('')
      expect(result).toStrictEqual('')
    })
    test('full entry:', () => {
      const result = formatPolicy('098765432')
      expect(result).toStrictEqual('09/8.765.432')
    })
    test('9 characters:', () => {
      const result = formatPolicy('987654327')
      expect(result).toStrictEqual('98/7.654.327')
    })
    test('11 characters', () => {
      const result = formatPolicy('90876543278')
      expect(result).toStrictEqual('90/8.765.432-7')
    })
  })
  describe('formatBeEnterpriseNumber', () => {
    test('full entry:', () => {
      const result = formatBeEnterpriseNumber('1234567890')
      expect(result).toStrictEqual('1234.567.890')
    })
    test('empty:', () => {
      const result = formatBeEnterpriseNumber('')
      expect(result).toStrictEqual('')
    })
    test('full entry:', () => {
      const result = formatBeEnterpriseNumber('0123321123')
      expect(result).toStrictEqual('0123.321.123')
    })
    test('9 characters:', () => {
      const result = formatBeEnterpriseNumber('987654327')
      expect(result).toStrictEqual('9876.543.27')
    })
    test('11 characters', () => {
      const result = formatBeEnterpriseNumber('90876543278')
      expect(result).toStrictEqual('9087.654.327')
    })
    describe('formatBeIBAN', () => {
      test('full entry:', () => {
        const result = formatBeIBAN('68539007547034')
        expect(result).toStrictEqual('BE68 5390 0754 7034')
      })
      test('empty:', () => {
        const result = formatBeIBAN('')
        expect(result).toStrictEqual('')
      })
      test('full entry:', () => {
        const result = formatBeIBAN('11234567890123')
        expect(result).toStrictEqual('BE11 2345 6789 0123')
      })
      test('2 characters:', () => {
        const result = formatBeIBAN('12')
        expect(result).toStrictEqual('BE12')
      })
      test('4 characters', () => {
        const result = formatBeIBAN('1234')
        expect(result).toStrictEqual('BE12 34')
      })
      test('8 characters', () => {
        const result = formatBeIBAN('12345678')
        expect(result).toStrictEqual('BE12 3456 78')
      })
      test('12 characters', () => {
        const result = formatBeIBAN('123456789012')
        expect(result).toStrictEqual('BE12 3456 7890 12')
      })
    })
  })
})
