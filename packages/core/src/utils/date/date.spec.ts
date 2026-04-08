import { setupDsConfig, useDsConfig } from '../config'
import { DsDate } from './date'

describe('DsDate', () => {
  let date = DsDate.fromISO('2001-02-01')
  beforeEach(() => {
    setupDsConfig()
    date = DsDate.fromISO('2001-02-01')
  })
  describe('static', () => {
    describe('infoMonths', () => {
      test('should print german months long', () => {
        const months = DsDate.infoMonths({ locale: 'de-CH' })
        expect(months).toHaveLength(12)
        expect(months[0]).toBe('Januar')
      })
      test('should print german months short', () => {
        const months = DsDate.infoMonths({ locale: 'de-CH', format: 'short' })
        expect(months).toHaveLength(12)
        expect(months[0]).toBe('Jan')
      })
      test('should print other languages months long', () => {
        expect(DsDate.infoMonths({ locale: 'en' })[0]).toBe('January')
        expect(DsDate.infoMonths({ locale: 'fr' })[0]).toBe('janvier')
        expect(DsDate.infoMonths({ locale: 'it' })[0]).toBe('gennaio')
        expect(DsDate.infoMonths({ locale: 'nl' })[0]).toBe('januari')
        expect(DsDate.infoMonths({ locale: 'es' })[0]).toBe('enero')
        expect(DsDate.infoMonths({ locale: 'pl' })[0]).toBe('styczeń')
        expect(DsDate.infoMonths({ locale: 'pt' })[0]).toBe('janeiro')
        expect(DsDate.infoMonths({ locale: 'sv' })[0]).toBe('januari')
        expect(DsDate.infoMonths({ locale: 'fi' })[0]).toBe('tammikuu')
      })
    })

    describe('infoWeekdays', () => {
      test('should print german weekdays long', () => {
        const weekdays = DsDate.infoWeekdays({ locale: 'de-CH' })
        expect(weekdays).toHaveLength(7)
        expect(weekdays[0]).toBe('Montag')
      })
      test('should print german weekdays short', () => {
        const weekdays = DsDate.infoWeekdays({ locale: 'de-CH', format: 'short' })
        expect(weekdays).toHaveLength(7)
        expect(weekdays[0]).toBe('Mo')
      })
      test('should print other languages weekdays long', () => {
        expect(DsDate.infoWeekdays({ locale: 'en' })[0]).toBe('Monday')
        expect(DsDate.infoWeekdays({ locale: 'fr' })[0]).toBe('lundi')
        expect(DsDate.infoWeekdays({ locale: 'it' })[0]).toBe('lunedì')
        expect(DsDate.infoWeekdays({ locale: 'nl' })[0]).toBe('maandag')
        expect(DsDate.infoWeekdays({ locale: 'es' })[0]).toBe('lunes')
        expect(DsDate.infoWeekdays({ locale: 'pl' })[0]).toBe('poniedziałek')
        expect(DsDate.infoWeekdays({ locale: 'pt' })[0]).toBe('segunda-feira')
        expect(DsDate.infoWeekdays({ locale: 'sv' })[0]).toBe('måndag')
        expect(DsDate.infoWeekdays({ locale: 'fi' })[0]).toBe('maanantai')
      })
    })

    describe('fromAnyFormat', () => {
      test('should parse all supported formats with separator', () => {
        expect(DsDate.fromAnyFormat('20.02.1988').toISODate()).toStrictEqual('1988-02-20')
        expect(DsDate.fromAnyFormat('20/02/1988').toISODate()).toStrictEqual('1988-02-20')

        expect(DsDate.fromAnyFormat('1.02.1988').toISODate()).toStrictEqual('1988-02-01')
        expect(DsDate.fromAnyFormat('01.2.1988').toISODate()).toStrictEqual('1988-02-01')
        expect(DsDate.fromAnyFormat('1.2.1988').toISODate()).toStrictEqual('1988-02-01')
      })

      test('should parse to todays year', () => {
        const year = new Date().getFullYear()
        expect(DsDate.fromAnyFormat('1.2.').toISODate()).toStrictEqual(`${year}-02-01`)
        expect(DsDate.fromAnyFormat('1.2').toISODate()).toStrictEqual(`${year}-02-01`)
      })

      test('should fill up with the year correctly by the cutoff year', () => {
        const year = new Date().getFullYear()
        const cutoff = year + 10
        const cutoffTwoDigits = cutoff % 100
        expect(DsDate.fromAnyFormat(`1.1.${cutoffTwoDigits}`).toISODate()).toStrictEqual(`20${cutoffTwoDigits}-01-01`)
        expect(DsDate.fromAnyFormat(`1.1.${cutoffTwoDigits - 1}`).toISODate()).toStrictEqual(
          `20${cutoffTwoDigits - 1}-01-01`,
        )
        expect(DsDate.fromAnyFormat(`1.1.${cutoffTwoDigits + 1}`).toISODate()).toStrictEqual(
          `19${cutoffTwoDigits + 1}-01-01`,
        )
      })

      test('should parse all supported number formats', () => {
        expect(DsDate.fromAnyFormat('20021988').toISODate()).toStrictEqual('1988-02-20')
      })
    })
    describe('fromISO', () => {
      test('should parse all supported number formats', () => {
        const date = DsDate.fromISO('2001-02-01')
        expect(date.isValid).toBeTruthy()
        expect(date.toISODate()).toStrictEqual('2001-02-01')
      })
    })
  })
  describe('instance', () => {
    describe('isValid', () => {
      test('should return true if it is a valid date and false if it is not', () => {
        expect(DsDate.fromAnyFormat('20.02.1988').isValid).toBeTruthy()
        expect(DsDate.fromAnyFormat('.20/02/1988').isValid).toBeFalsy()
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

        const config = useDsConfig()
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

        expect(DsDate.fromISO(date1).isAfter(date2)).toBeTruthy()
        expect(DsDate.fromISO(date2).isAfter(date1)).toBeFalsy()
        expect(DsDate.fromISO(date1).isAfter(date1)).toBeFalsy()
        expect(DsDate.fromISO(date1).isAfterOrEqual(date1)).toBeTruthy()
        expect(DsDate.fromISO(date1).isAfterOrEqual(date2)).toBeTruthy()
        expect(DsDate.fromISO(date2).isAfterOrEqual(date1)).toBeFalsy()
      })
    })
    describe('isBefore', () => {
      test('should return the date formatted for the user', () => {
        const date1 = '2023-01-04'
        const date2 = '2023-01-05'

        expect(DsDate.fromISO(date1).isBefore(date2)).toBeTruthy()
        expect(DsDate.fromISO(date2).isBefore(date1)).toBeFalsy()
        expect(DsDate.fromISO(date1).isBefore(date1)).toBeFalsy()
        expect(DsDate.fromISO(date1).isBeforeOrEqual(date1)).toBeTruthy()
        expect(DsDate.fromISO(date1).isBeforeOrEqual(date2)).toBeTruthy()
        expect(DsDate.fromISO(date2).isBeforeOrEqual(date1)).toBeFalsy()
      })
    })
  })
})
