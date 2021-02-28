import { BalValidatorFn } from './validator.type'

/**
 * Returns `true` if the value date is before the given date
 *
 * ```typescript
 * BalValidators.isCustom((value) => value > 2)(3) // true
 * ```
 */
export function isCustom(validatorFn: BalValidatorFn): BalValidatorFn {
  return function (value: any) {
    return validatorFn(value)
  }
}
