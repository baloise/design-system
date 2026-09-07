import { AsYouType, getCountryCallingCode, parseIncompletePhoneNumber } from 'libphonenumber-js/min'
import type { CountryCode } from 'libphonenumber-js/min'
import examples from 'libphonenumber-js/mobile/examples'

const examplePlaceholderCache = new Map<CountryCode, string>()

export class PhoneFormatter {
  private asYouType: AsYouType
  private country?: CountryCode

  constructor(country?: string) {
    this.country = toCountryCode(country)
    this.asYouType = createAsYouType(this.country)
  }

  setCountry(country?: string) {
    this.country = toCountryCode(country)
    this.asYouType = createAsYouType(this.country)
  }

  formatLive(raw: string): string {
    const input = normalizeInput(raw)
    if (!input) {
      this.asYouType = createAsYouType(this.country)
      return ''
    }

    if (input.startsWith('+')) {
      this.asYouType = new AsYouType()
      return stripCallingCode(this.asYouType.input(input), this.country)
    }

    if (!this.country || input.startsWith('0')) {
      this.asYouType = createAsYouType(this.country)
      return this.asYouType.input(input)
    }

    this.asYouType = new AsYouType()
    const callingCode = getCountryCallingCode(this.country)
    return stripCallingCode(this.asYouType.input(`+${callingCode}${input}`), this.country)
  }

  formatStable(): string {
    const number = this.asYouType.getNumber()
    if (!number || !this.country) {
      return this.getNationalNumber()
    }

    return formatNationalSignificantNumber(number.nationalNumber, this.country)
  }

  getE164(): string | null {
    return this.asYouType.getNumberValue() ?? this.asYouType.getNumber()?.number ?? null
  }

  getNationalNumber(): string {
    return this.asYouType.getNumber()?.nationalNumber ?? this.asYouType.getChars()
  }
}

export function detectCountryFromInput(raw: string): string | undefined {
  const input = normalizeInput(raw)
  if (!input.startsWith('+')) {
    return undefined
  }

  const formatter = new AsYouType()
  formatter.input(input)
  return formatter.getCountry() || formatter.getNumber()?.country
}

export function getExamplePlaceholder(country?: string): string {
  const countryCode = toCountryCode(country)
  if (!countryCode) {
    return ''
  }

  const cached = examplePlaceholderCache.get(countryCode)
  if (cached !== undefined) {
    return cached
  }

  const example = examples[countryCode]
  if (!example) {
    examplePlaceholderCache.set(countryCode, '')
    return ''
  }
  const formatter = new PhoneFormatter(countryCode)
  formatter.formatLive(example)
  const placeholder = formatter.formatStable()
  examplePlaceholderCache.set(countryCode, placeholder)
  return placeholder
}

export function countDigitsBefore(value: string, caret: number): number {
  let count = 0
  const limit = Math.max(0, Math.min(caret, value.length))
  for (let i = 0; i < limit; i++) {
    if (isDigit(value[i])) {
      count++
    }
  }
  return count
}

export function caretFromDigitCount(formatted: string, digitCount: number): number {
  if (digitCount <= 0) {
    return 0
  }

  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (isDigit(formatted[i])) {
      seen++
      if (seen === digitCount) {
        return i + 1
      }
    }
  }
  return formatted.length
}

function createAsYouType(country?: CountryCode): AsYouType {
  return country ? new AsYouType(country) : new AsYouType()
}

function formatNationalSignificantNumber(nationalNumber: string, country: CountryCode): string {
  const callingCode = getCountryCallingCode(country)
  const formatter = new AsYouType()
  return stripCallingCode(formatter.input(`+${callingCode}${nationalNumber}`), country)
}

function stripCallingCode(formatted: string, country?: CountryCode): string {
  if (!country || !formatted.startsWith('+')) {
    return formatted
  }

  const callingCode = getCountryCallingCode(country)
  const prefix = `+${callingCode}`
  return formatted.startsWith(prefix) ? formatted.slice(prefix.length).trimStart() : formatted
}

function normalizeInput(raw: string): string {
  const trimmed = (raw ?? '').trim()
  const international = trimmed.startsWith('00') ? `+${trimmed.slice(2)}` : trimmed
  return parseIncompletePhoneNumber(international)
}

function toCountryCode(country?: string): CountryCode | undefined {
  return country ? (country as CountryCode) : undefined
}

function isDigit(char: string): boolean {
  return char >= '0' && char <= '9'
}
