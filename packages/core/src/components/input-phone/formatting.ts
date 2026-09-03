import { AsYouType } from 'libphonenumber-js/min'
import type { CountryCode } from 'libphonenumber-js/min'

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
    this.asYouType.reset()
    const formatted = this.asYouType.input(raw ?? '')
    if (formatted.startsWith('+')) {
      return this.formatStable() || this.getNationalNumber()
    }
    return formatted
  }

  formatStable(): string {
    const number = this.asYouType.getNumber()
    if (number) {
      return number.formatNational()
    }
    return this.getNationalNumber()
  }

  getE164(): string | null {
    return this.asYouType.getNumberValue() ?? this.asYouType.getNumber()?.number ?? null
  }

  getNationalNumber(): string {
    return this.asYouType.getNumber()?.nationalNumber ?? this.asYouType.getChars()
  }
}

export function detectCountryFromInput(raw: string): string | undefined {
  const trimmed = (raw ?? '').trim()
  if (!trimmed.startsWith('+')) {
    return undefined
  }

  const formatter = new AsYouType()
  formatter.input(trimmed)
  return formatter.getCountry() || formatter.getNumber()?.country
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

function toCountryCode(country?: string): CountryCode | undefined {
  return country ? (country as CountryCode) : undefined
}

function isDigit(char: string): boolean {
  return char >= '0' && char <= '9'
}
