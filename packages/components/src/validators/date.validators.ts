import { isEmpty } from '../utils'
import * as BalUtils from '../utils'
import { BalValidatorFn } from './validator.type'

/**
 * Returns `true` if the value date is before the given date
 *
 * ```typescript
 * BalValidators.isBefore('2000-01-02')('2000-01-01') // true
 * BalValidators.isBefore(new Date(2020, 0, 2))(new Date(2020, 0, 1)) // true
 * ```
 */
export function isBefore(date: Date | string): BalValidatorFn {
  return function (value: any) {
    if (isEmpty(value)) {
      return true
    }
    return BalUtils.isBefore(value, date)
  }
}

/**
 * Returns `true` if the value date is before the given date
 *
 * ```typescript
 * BalValidators.isAfter('2000-01-01')('2000-01-02') // true
 * BalValidators.isAfter(new Date(2020, 0, 1))(new Date(2020, 0, 2)) // true
 * ```
 */
export function isAfter(date: Date | string): BalValidatorFn {
  return function (value: any) {
    if (isEmpty(value)) {
      return true
    }
    return BalUtils.isAfter(value, date)
  }
}

/**
 * Returns `true` if the value is valid date
 *
 * ```typescript
 * BalValidators.isDate()('2000-01-02') // true
 * BalValidators.isDate()(new Date(2000, 0, 1)) // true
 * ```
 */
export function isDate(): BalValidatorFn {
  return function (value: any) {
    if (isEmpty(value)) {
      return true
    }
    return BalUtils.isValidDate(value)
  }
}
