import { isBlank } from '../utils/balStringUtil'

/**
 * Transforms the given string parameter to capitalize string.
 *
 * ```typescript
 * balCapitalize('baloise') // Baloise
 * ```
 */
export const balCapitalize = (value: string): string => {
  if (isBlank(value)) {
    return ''
  } else {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
