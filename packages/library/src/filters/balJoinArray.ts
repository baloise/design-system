import { isArray } from '../utils/balUtil'

/**
 * @description
 * Transforms the given string array in to a string.
 *
 * @example
 * balJoinArray(['Apple', 'Potato', 'Bacon']) => Apple, Potato, Bacon
 */
export const balJoinArray = (value: string[], delimiter: string = ', '): string => {
  if (value === null || value === undefined) {
    return ''
  }

  if (isArray(value)) {
    return value.join(delimiter)
  }

  return `${value}`
}
