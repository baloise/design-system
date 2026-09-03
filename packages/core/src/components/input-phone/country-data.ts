import { getCountries, getCountryCallingCode } from 'libphonenumber-js/min'
import type { CountryCode } from 'libphonenumber-js/min'

export type CountryOption = {
  code: string
  callingCode: string
}

let allCountries: CountryOption[] | undefined

export function getAllCountries(): CountryOption[] {
  if (!allCountries) {
    allCountries = []
    for (const code of getCountries()) {
      try {
        allCountries.push({
          code,
          callingCode: getCountryCallingCode(code as CountryCode),
        })
      } catch {
        // Skip entries the min metadata does not have a calling code for.
      }
    }
  }
  return allCountries
}

export function parseCountriesProp(countries: string | string[] | undefined): string[] | undefined {
  if (countries === undefined || countries === null) {
    return undefined
  }

  const list = Array.isArray(countries) ? countries : countries.split(',')
  const normalized = list.map(code => code.trim().toUpperCase()).filter(code => code.length > 0)

  return normalized.length > 0 ? normalized : undefined
}

export function filterCountries(allowList: string[] | undefined): CountryOption[] {
  const all = getAllCountries()
  if (!allowList) {
    return all
  }

  const byCode = new Map(all.map(country => [country.code, country]))
  return allowList.map(code => byCode.get(code)).filter((country): country is CountryOption => country !== undefined)
}

const displayNamesCache = new Map<string, Intl.DisplayNames>()

export function getCountryName(code: string, language: string): string {
  try {
    let displayNames = displayNamesCache.get(language)
    if (!displayNames) {
      displayNames = new Intl.DisplayNames([language], { type: 'region' })
      displayNamesCache.set(language, displayNames)
    }
    return displayNames.of(code) ?? code
  } catch {
    return code
  }
}

export function matchesCountryQuery(country: CountryOption, name: string, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) {
    return true
  }

  return (
    name.toLowerCase().includes(q) ||
    country.code.toLowerCase().includes(q) ||
    country.callingCode.includes(q) ||
    `+${country.callingCode}`.includes(q)
  )
}
