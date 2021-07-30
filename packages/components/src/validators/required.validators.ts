import { isEmpty } from '../utils'
import { BalValidatorFn } from './validator.type'

/**
 * Returns `true` if the value is a non-empty value
 *
 * ```typescript
 * BalValidators.isRequired()('foo') // true
 * BalValidators.isRequired()('') // false
 * ```
 */
export function isRequired(): BalValidatorFn {
  return function (value: any) {
    return !isEmpty(value)
  }
}

/**
 * Returns `true` if the value is true. This validator is commonly used for required checkboxes.
 *
 * ```typescript
 * BalValidators.isRequiredTrue()(true) // true
 * BalValidators.isRequiredTrue()('') // false
 * ```
 */
export function isRequiredTrue(): BalValidatorFn {
  return function (value: any) {
    return value === true
  }
}
