import { isValidMonetaryNumber } from '../utils'
import { parseInt, isNumber as _isNumber } from 'lodash'
import { BalValidatorFn } from './validator.type'

/**
 * Returns `true` if the number is bigger or equal than the min number
 *
 * ```typescript
 * BalValidators.isMin(10)(10) // true
 * BalValidators.isMin(10)(11) // true
 * BalValidators.isMin(10)(9) // false
 * ```
 */
export function isMin(min: number): BalValidatorFn {
  return function (value: any) {
    const num = parseInt(value)
    if (num === undefined) {
      return false
    }
    return num >= min
  }
}

/**
 * Returns `true` if the number is smaller or equal than the max number
 *
 * ```typescript
 * BalValidators.isMax(10)(10) // true
 * BalValidators.isMax(10)(9) // true
 * BalValidators.isMax(10)(11) // false
 * ```
 */
export function isMax(max: number): BalValidatorFn {
  return function (value: any) {
    const num = parseInt(value)
    if (num === undefined) {
      return false
    }
    return num <= max
  }
}

/**
 * Returns `true` if the number is valid
 *
 * ```typescript
 * BalValidators.isNumber()(10) // true
 * BalValidators.isNumber()('a') // false
 * ```
 */
export function isNumber(): BalValidatorFn {
  return function (value: any) {
    return _isNumber(value)
  }
}

/**
 * Returns `true` if the value is a valid formatted number
 *
 * ```typescript
 * BalValidators.isMonetaryNumber()(10) // true
 * BalValidators.isMonetaryNumber()(`1'000.99`) // true
 * BalValidators.isMonetaryNumber()(`a`) // false
 * ```
 */
export function isMonetaryNumber(): BalValidatorFn {
  return function (value: any) {
    if (_isNumber(value)) {
      return true
    }
    return isValidMonetaryNumber(value)
  }
}
