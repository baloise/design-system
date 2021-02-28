import { isArray, isBoolean, isDefined, isString, isObject } from '../utils/balUtil'
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
    if (!isDefined(value)) {
      return false
    }

    if (isString(value) && value === '') {
      return false
    }

    if (isBoolean(value)) {
      return true
    }

    if (isArray(value) && value.length === 0) {
      return false
    }

    if (isObject(value) && Object.keys(value).length === 0) {
      return false
    }

    return true
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

// export const minLength = (length: number): ValidatorFn<string> => value => {
//   return value === undefined || value === null || value.length < length
//     ? i18n.global.t('validator.minLength')
//     : null
// }

// export const maxLength = (length: number): ValidatorFn<string> => value => {
//   return value === undefined || value === null || value.length > length
//     ? i18n.global.t('validator.maxLength')
//     : null
// }
