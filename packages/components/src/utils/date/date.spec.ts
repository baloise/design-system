import { initialize, useBalConfig } from '../config'
import { BalDate } from './date'

describe('balDate', () => {
  let date = BalDate.fromISO('2001-02-01')
  beforeEach(() => {
    initialize()
    date = BalDate.fromISO('2001-02-01')
  })
  describe('static', () => {
    describe('fromAnyFormat', () => {
      test('should parse all supported formats with separator', () => {
        expect(BalDate.fromAnyFormat('20.02.1988').toISODate()).toStrictEqual('1988-02-20')
        expect(BalDate.fromAnyFormat('20/02/1988').toISODate()).toStrictEqual('1988-02-20')

        expect(BalDate.fromAnyFormat('1.02.1988').toISODate()).toStrictEqual('1988-02-01')
        expect(BalDate.fromAnyFormat('01.2.1988').toISODate()).toStrictEqual('1988-02-01')
        expect(BalDate.fromAnyFormat('1.2.1988').toISODate()).toStrictEqual('1988-02-01')
        expect(BalDate.fromAnyFormat('1.2.88').toISODate()).toStrictEqual('1988-02-01')
        expect(BalDate.fromAnyFormat('1.2.01').toISODate()).toStrictEqual('2001-02-01')
      })

      test('should parse all supported number formats', () => {
        expect(BalDate.fromAnyFormat('20021988').toISODate()).toStrictEqual('1988-02-20')
      })
    })
    describe('fromISO', () => {
      test('should parse all supported number formats', () => {
        const date = BalDate.fromISO('2001-02-01')
        expect(date.isValid).toBeTruthy()
        expect(date.toISODate()).toStrictEqual('2001-02-01')
      })
    })
  })
  describe('instance', () => {
    describe('isValid', () => {
      test('should return true if it is a valid date and false if it is not', () => {
        expect(BalDate.fromAnyFormat('20.02.1988').isValid).toBeTruthy()
        expect(BalDate.fromAnyFormat('.20/02/1988').isValid).toBeFalsy()
      })
    })
    describe('toISODate', () => {
      test('should return the date in the ISO date format without time', () => {
        expect(date.toISODate()).toStrictEqual('2001-02-01')
      })
    })
    describe('toFormat', () => {
      test('should return the date formatted for the user', () => {
        expect(date.toFormat()).toStrictEqual('01.02.2001')

        const config = useBalConfig()
        if (config) {
          config.language = 'fr'
          config.region = 'BE'
        }
        expect(date.toFormat()).toStrictEqual('01/02/2001')
      })
    })
  })
})
