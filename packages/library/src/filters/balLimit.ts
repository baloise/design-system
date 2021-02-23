/**
 * @description
 * Limits the input string.
 *
 * @example
 * balLimit('Some string that is ways to long to be rendered') => Some string that is ...
 */
export const balLimit = (value: string | undefined | null, limit: number = 20): string => {
  if (value === null || value === undefined) {
    return ''
  }

  if (value.length > limit && limit > 0) {
    const TRAIL_STRING = '...'
    return value.substring(0, limit) + TRAIL_STRING
  }

  return value
}
