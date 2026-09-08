import {
  filterCountries,
  getAllCountries,
  getCountryName,
  matchesCountryQuery,
  parseCountriesProp,
} from './country-data'

describe('ds-input-phone country-data', () => {
  describe('parseCountriesProp', () => {
    test('returns undefined for empty or missing values', () => {
      expect(parseCountriesProp(undefined)).toBeUndefined()
      expect(parseCountriesProp('')).toBeUndefined()
      expect(parseCountriesProp('  ,  ')).toBeUndefined()
      expect(parseCountriesProp([])).toBeUndefined()
    })

    test('splits a comma-separated string and uppercases codes', () => {
      expect(parseCountriesProp('ch, de ,fr')).toEqual(['CH', 'DE', 'FR'])
    })

    test('normalizes an array of codes', () => {
      expect(parseCountriesProp(['ch', 'DE'])).toEqual(['CH', 'DE'])
    })
  })

  describe('filterCountries', () => {
    test('returns every libphonenumber country when no allow-list is set', () => {
      const all = getAllCountries()
      expect(filterCountries(undefined)).toBe(all)
      expect(all.length).toBeGreaterThan(50)
      expect(all.find(country => country.code === 'CH')?.callingCode).toBe('41')
    })

    test('keeps allow-list order and drops unknown codes', () => {
      const filtered = filterCountries(['DE', 'XX', 'CH'])
      expect(filtered.map(country => country.code)).toEqual(['DE', 'CH'])
    })
  })

  describe('getCountryName', () => {
    test('returns a localized region name', () => {
      expect(getCountryName('CH', 'en')).toBe('Switzerland')
      expect(getCountryName('CH', 'de')).toBe('Schweiz')
    })
  })

  describe('matchesCountryQuery', () => {
    const switzerland = { code: 'CH', callingCode: '41' }

    test('matches name, ISO code, and calling code', () => {
      expect(matchesCountryQuery(switzerland, 'Switzerland', 'switz')).toBe(true)
      expect(matchesCountryQuery(switzerland, 'Switzerland', 'ch')).toBe(true)
      expect(matchesCountryQuery(switzerland, 'Switzerland', '41')).toBe(true)
      expect(matchesCountryQuery(switzerland, 'Switzerland', '+41')).toBe(true)
    })

    test('ignores blank queries and rejects unrelated text', () => {
      expect(matchesCountryQuery(switzerland, 'Switzerland', '  ')).toBe(true)
      expect(matchesCountryQuery(switzerland, 'Switzerland', 'germany')).toBe(false)
    })
  })
})
