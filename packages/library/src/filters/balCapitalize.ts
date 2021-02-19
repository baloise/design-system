import { isBlank } from '../utils/balStringUtil'

/**
 * Transforms the given string parameter to capitalize string.
 *
 * ```typescript
 * balCapitalize('baloise') // Baloise
 * ```
 */
export const balCapitalize = (value: string | null | undefined): string => {
  if (isBlank(value)) {
    return ''
  } else {
    const s = value as string
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
