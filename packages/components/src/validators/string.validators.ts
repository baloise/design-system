import { isNil } from 'lodash'
import { isEmpty } from '../utils'
import { BalValidatorFn } from './validator.type'

/**
 * Returns `true` if the string is bigger or equal than the min length
 *
 * ```typescript
 * BalValidators.isMinLength(3)('123') // true
 * BalValidators.isMinLength(3)('12') // false
 * ```
 */
export function isMinLength(minLength: number): BalValidatorFn {
  return function (value: any) {
    if (isEmpty(value)) {
      return true
    }
    let text = `${value}`
    if (isNil(value)) {
      text = ''
    }
    return text.length >= minLength
  }
}

/**
 * Returns `true` if the string is smaller or equal than the max length
 *
 * ```typescript
 * BalValidators.isMaxLength(3)('123') // true
 * BalValidators.isMaxLength(3)('1234') // false
 * ```
 */
export function isMaxLength(maxLength: number): BalValidatorFn {
  return function (value: any) {
    if (isEmpty(value)) {
      return true
    }
    let text = `${value}`
    if (isNil(value)) {
      text = ''
    }
    return text.length <= maxLength
  }
}
