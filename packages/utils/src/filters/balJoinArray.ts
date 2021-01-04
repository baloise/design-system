import { BalUtil } from '../utils/util'

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

  if (BalUtil.isArray(value)) {
    return value.join(delimiter)
  }

  return `${value}`
}
