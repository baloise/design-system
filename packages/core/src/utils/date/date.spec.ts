import { setupConfig, useBalConfig } from '../config'
import { BalDate } from './date'

describe('balDate', () => {
  let date = BalDate.fromISO('2001-02-01')
  beforeEach(() => {
    setupConfig()
    date = BalDate.fromISO('2001-02-01')
  })
  describe('static', () => {
    describe('infoMonths', () => {
      test('should print german months long', () => {
        const months = BalDate.infoMonths({ locale: 'de-CH' })
        expect(months).toHaveLength(12)
        expect(months[0]).toBe('Januar')
      })
      test('should print german months short', () => {
        const months = BalDate.infoMonths({ locale: 'de-CH', format: 'short' })
        expect(months).toHaveLength(12)
        expect(months[0]).toBe('Jan')
      })
      test('should print other languages months long', () => {
        expect(BalDate.infoMonths({ locale: 'en' })[0]).toBe('January')
        expect(BalDate.infoMonths({ locale: 'fr' })[0]).toBe('janvier')
        expect(BalDate.infoMonths({ locale: 'it' })[0]).toBe('gennaio')
        expect(BalDate.infoMonths({ locale: 'nl' })[0]).toBe('januari')
        expect(BalDate.infoMonths({ locale: 'es' })[0]).toBe('enero')
        expect(BalDate.infoMonths({ locale: 'pl' })[0]).toBe('styczeń')
        expect(BalDate.infoMonths({ locale: 'pt' })[0]).toBe('janeiro')
        expect(BalDate.infoMonths({ locale: 'sv' })[0]).toBe('januari')
        expect(BalDate.infoMonths({ locale: 'fi' })[0]).toBe('tammikuu')
      })
    })

    describe('infoWeekdays', () => {
      test('should print german weekdays long', () => {
        const weekdays = BalDate.infoWeekdays({ locale: 'de-CH' })
        expect(weekdays).toHaveLength(7)
        expect(weekdays[0]).toBe('Montag')
      })
      test('should print german weekdays short', () => {
        const weekdays = BalDate.infoWeekdays({ locale: 'de-CH', format: 'short' })
        expect(weekdays).toHaveLength(7)
        expect(weekdays[0]).toBe('Mo')
      })
      test('should print other languages weekdays long', () => {
        expect(BalDate.infoWeekdays({ locale: 'en' })[0]).toBe('Monday')
        expect(BalDate.infoWeekdays({ locale: 'fr' })[0]).toBe('lundi')
        expect(BalDate.infoWeekdays({ locale: 'it' })[0]).toBe('lunedì')
        expect(BalDate.infoWeekdays({ locale: 'nl' })[0]).toBe('maandag')
        expect(BalDate.infoWeekdays({ locale: 'es' })[0]).toBe('lunes')
        expect(BalDate.infoWeekdays({ locale: 'pl' })[0]).toBe('poniedziałek')
        expect(BalDate.infoWeekdays({ locale: 'pt' })[0]).toBe('segunda-feira')
        expect(BalDate.infoWeekdays({ locale: 'sv' })[0]).toBe('måndag')
        expect(BalDate.infoWeekdays({ locale: 'fi' })[0]).toBe('maanantai')
      })
    })

    describe('fromAnyFormat', () => {
      test('should parse all supported formats with separator', () => {
        expect(BalDate.fromAnyFormat('20.02.1988').toISODate()).toStrictEqual('1988-02-20')
        expect(BalDate.fromAnyFormat('20/02/1988').toISODate()).toStrictEqual('1988-02-20')

        expect(BalDate.fromAnyFormat('1.02.1988').toISODate()).toStrictEqual('1988-02-01')
        expect(BalDate.fromAnyFormat('01.2.1988').toISODate()).toStrictEqual('1988-02-01')
        expect(BalDate.fromAnyFormat('1.2.1988').toISODate()).toStrictEqual('1988-02-01')
      })

      test('should parse to todays year', () => {
        const year = new Date().getFullYear()
        expect(BalDate.fromAnyFormat('1.2.').toISODate()).toStrictEqual(`${year}-02-01`)
        expect(BalDate.fromAnyFormat('1.2').toISODate()).toStrictEqual(`${year}-02-01`)
      })

      test('should fill up with the year correctly by the cutoff year', () => {
        const year = new Date().getFullYear()
        const cutoff = year + 10
        const cutoffTwoDigits = cutoff % 100
        console.log('cutoff', cutoff)
        expect(BalDate.fromAnyFormat(`1.1.${cutoffTwoDigits}`).toISODate()).toStrictEqual(`20${cutoffTwoDigits}-01-01`)
        expect(BalDate.fromAnyFormat(`1.1.${cutoffTwoDigits - 1}`).toISODate()).toStrictEqual(
          `20${cutoffTwoDigits - 1}-01-01`,
        )
        expect(BalDate.fromAnyFormat(`1.1.${cutoffTwoDigits + 1}`).toISODate()).toStrictEqual(
          `19${cutoffTwoDigits + 1}-01-01`,
        )
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
    describe('isAfter', () => {
      test('should return the date formatted for the user', () => {
        const date1 = '2023-01-05'
        const date2 = '2023-01-04'

        expect(BalDate.fromISO(date1).isAfter(date2)).toBeTruthy()
        expect(BalDate.fromISO(date2).isAfter(date1)).toBeFalsy()
        expect(BalDate.fromISO(date1).isAfter(date1)).toBeFalsy()
        expect(BalDate.fromISO(date1).isAfterOrEqual(date1)).toBeTruthy()
        expect(BalDate.fromISO(date1).isAfterOrEqual(date2)).toBeTruthy()
        expect(BalDate.fromISO(date2).isAfterOrEqual(date1)).toBeFalsy()
      })
    })
    describe('isBefore', () => {
      test('should return the date formatted for the user', () => {
        const date1 = '2023-01-04'
        const date2 = '2023-01-05'

        expect(BalDate.fromISO(date1).isBefore(date2)).toBeTruthy()
        expect(BalDate.fromISO(date2).isBefore(date1)).toBeFalsy()
        expect(BalDate.fromISO(date1).isBefore(date1)).toBeFalsy()
        expect(BalDate.fromISO(date1).isBeforeOrEqual(date1)).toBeTruthy()
        expect(BalDate.fromISO(date1).isBeforeOrEqual(date2)).toBeTruthy()
        expect(BalDate.fromISO(date2).isBeforeOrEqual(date1)).toBeFalsy()
      })
    })
  })
})
