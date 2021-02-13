import { isBlank } from '../utils/balStringUtil'

/**
 * @description
 * Transforms the given string parameter to capitalize string.
 *
 * @example
 * balCapitalize('baloise') => Baloise
 */
export const balCapitalize = (value: string): string => {
  if (isBlank(value)) {
    return ''
  } else {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
