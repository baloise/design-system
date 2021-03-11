import { isEmpty, capitalize } from 'lodash'

/**
 * Transforms the given string parameter to capitalize string.
 *
 * ```typescript
 * balCapitalize('baloise') // Baloise
 * ```
 */
export function balCapitalize(value: string | null | undefined): string {
  if (isEmpty(value)) {
    return ''
  } else {
    return capitalize(value as string)
  }
}
