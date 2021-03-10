import { isArray } from 'lodash'

/**
 * Transforms the given string array in to a string.
 *
 * ```typescript
 * balJoinArray(['Apple', 'Potato', 'Bacon']) // Apple, Potato, Bacon
 * ```
 */
export function balJoinArray(value: string[] | undefined | null, delimiter: string = ', '): string {
  if (value === null || value === undefined) {
    return ''
  }

  if (isArray(value)) {
    return value.join(delimiter)
  }

  return `${value}`
}
