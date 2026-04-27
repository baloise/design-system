import { BeEnterpriseNumber } from '../masks/be-enterprise-number'
import { BeIBAN } from '../masks/be-iban'
import { ClaimNumber } from '../masks/claim-number'
import { ContractNumber } from '../masks/contract-number'
import { OfferNumber } from '../masks/offer-number'
import { VehicleRegistrationNumber } from '../masks/vehicle-registration-number'

describe('VehicleRegistrationNumber', () => {
  const formatter = new VehicleRegistrationNumber()

  describe('format', () => {
    test('full entry', () => {
      expect(formatter.format('123456789')).toStrictEqual('123.456.789')
    })
    test('empty', () => {
      expect(formatter.format('')).toStrictEqual('')
    })
    test('partial 2 characters', () => {
      expect(formatter.format('73')).toStrictEqual('73')
    })
    test('partial 3 characters', () => {
      expect(formatter.format('730')).toStrictEqual('730')
    })
    test('partial 4 characters', () => {
      expect(formatter.format('7303')).toStrictEqual('730.3')
    })
    test('partial 9 characters', () => {
      expect(formatter.format('123456789')).toStrictEqual('123.456.789')
    })
    test('partial 12 characters', () => {
      expect(formatter.format('123456789012')).toStrictEqual('123.456.789.012')
    })
    test('partial 13 characters', () => {
      expect(formatter.format('1234567890123')).toStrictEqual('123.456.789.012')
    })
  })
})

describe('ClaimNumber', () => {
  const formatter = new ClaimNumber()

  describe('format', () => {
    test('full entry', () => {
      expect(formatter.format('73001217169')).toStrictEqual('73/001217/16.9')
    })
    test('empty', () => {
      expect(formatter.format('')).toStrictEqual('')
    })
    test('partial 2 characters', () => {
      expect(formatter.format('73')).toStrictEqual('73')
    })
    test('partial 3 characters', () => {
      expect(formatter.format('730')).toStrictEqual('73/0')
    })
    test('partial 9 characters', () => {
      expect(formatter.format('730012171')).toStrictEqual('73/001217/1')
    })
    test('partial 12 characters', () => {
      expect(formatter.format('730012171699')).toStrictEqual('73/001217/16.9')
    })
    test('claim number with X postfix uppercase', () => {
      expect(formatter.format('7300772816X')).toStrictEqual('73/007728/16.X')
    })
    test('claim number with x postfix lowercase', () => {
      expect(formatter.format('7300772816x')).toStrictEqual('73/007728/16.X')
    })
  })
})

describe('OfferNumber', () => {
  const formatter = new OfferNumber()

  describe('format', () => {
    test('full entry', () => {
      expect(formatter.format('987654321')).toStrictEqual('98/7.654.321')
    })
    test('empty', () => {
      expect(formatter.format('')).toStrictEqual('')
    })
    test('3 characters', () => {
      expect(formatter.format('987')).toStrictEqual('98/7')
    })
    test('4 characters', () => {
      expect(formatter.format('9876')).toStrictEqual('98/7.6')
    })
    test('6 characters', () => {
      expect(formatter.format('987654')).toStrictEqual('98/7.654')
    })
    test('7 characters', () => {
      expect(formatter.format('9876543')).toStrictEqual('98/7.654.3')
    })
    test('10 characters truncates to 9', () => {
      expect(formatter.format('9876543219')).toStrictEqual('98/7.654.321')
    })
  })
})

describe('ContractNumber', () => {
  const formatter = new ContractNumber()

  describe('format', () => {
    test('full entry', () => {
      expect(formatter.format('9087654321')).toStrictEqual('90/8.765.432-1')
    })
    test('empty', () => {
      expect(formatter.format('')).toStrictEqual('')
    })
    test('9 characters', () => {
      expect(formatter.format('987654327')).toStrictEqual('98/7.654.327')
    })
    test('11 characters truncates to 10', () => {
      expect(formatter.format('90876543278')).toStrictEqual('90/8.765.432-7')
    })
  })
})

describe('BeEnterpriseNumber', () => {
  const formatter = new BeEnterpriseNumber()

  describe('format', () => {
    test('full entry', () => {
      expect(formatter.format('1234567890')).toStrictEqual('1234.567.890')
    })
    test('empty', () => {
      expect(formatter.format('')).toStrictEqual('')
    })
    test('leading zeros preserved', () => {
      expect(formatter.format('0123321123')).toStrictEqual('0123.321.123')
    })
    test('9 characters', () => {
      expect(formatter.format('987654327')).toStrictEqual('9876.543.27')
    })
    test('11 characters truncates to 10', () => {
      expect(formatter.format('90876543278')).toStrictEqual('9087.654.327')
    })
  })
})

describe('BeIBAN', () => {
  const formatter = new BeIBAN()

  describe('format', () => {
    test('full entry', () => {
      expect(formatter.format('68539007547034')).toStrictEqual('BE68 5390 0754 7034')
    })
    test('empty', () => {
      expect(formatter.format('')).toStrictEqual('')
    })
    test('2 characters', () => {
      expect(formatter.format('12')).toStrictEqual('BE12')
    })
    test('4 characters', () => {
      expect(formatter.format('1234')).toStrictEqual('BE12 34')
    })
    test('8 characters', () => {
      expect(formatter.format('12345678')).toStrictEqual('BE12 3456 78')
    })
    test('12 characters', () => {
      expect(formatter.format('123456789012')).toStrictEqual('BE12 3456 7890 12')
    })
    test('15 characters truncates to 14', () => {
      expect(formatter.format('11234567890123')).toStrictEqual('BE11 2345 6789 0123')
    })
  })
})
