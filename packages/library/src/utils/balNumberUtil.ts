import { isNaN, isNil, isString } from 'lodash'

/**
 * Returns `true` if the arrays are equal
 *
 * ```typescript
 * isValidMonetaryNumber(`1'000.99`) // true
 * ```
 */
export function isValidMonetaryNumber(stringValue: string): boolean {
  if (isNil(stringValue) && !isString(stringValue)) {
    return false
  }

  stringValue = stringValue.replace(/'/g, '')
  stringValue = stringValue.replace(/‘/g, '')
  stringValue = stringValue.replace(/’/g, '')
  stringValue = stringValue.replace(/,/g, '.')

  return !isNaN(parseFloat(stringValue))
}
