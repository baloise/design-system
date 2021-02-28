import { isDefined } from '../utils/balUtil'
import { BalValidatorFn } from './validator.type'

/**
 * Returns `true` if the value matches the regex
 *
 * ```typescript
 * BalValidators.matchesRegex(new RegExp('^\\d+$'))('1') // true
 * ```
 */
export function matchesRegex(regex: RegExp): BalValidatorFn {
  return function (value: any) {
    return validateRegex(regex, value)
  }
}

/**
 * Returns `true` if the value matches the regex
 *
 * ```typescript
 * BalValidators.isEmail()('peter@baloise.ch') // true
 * ```
 */
export function isEmail(): BalValidatorFn {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return function (value: any) {
    return validateRegex(regex, value)
  }
}

/**
 * Returns `true` if the value matches the regex
 *
 * ```typescript
 * BalValidators.isPhone()('123 456 78 90') // true
 * ```
 */
export function isPhone(): BalValidatorFn {
  const regex = /^\+?[0-9 ]*$/
  return function (value: any) {
    return validateRegex(regex, value)
  }
}

function validateRegex(regex: RegExp, value: any): boolean {
  if (!isDefined(value)) {
    return false
  }
  if (typeof value !== 'string') {
    return false
  }
  return regex.test(value)
}
