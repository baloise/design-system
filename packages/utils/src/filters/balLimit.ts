/**
 * @description
 * Limits the input string.
 *
 * @example
 * balLimit('Some string that is ways to long to be rendered') => Some string that is ...
 */
export const balLimit = (value?: string, limit: number = 20): string => {
  const TRAIL_STRING = '...'

  if (value != null && value.length > limit && limit > 0) {
    return value.substring(0, limit) + TRAIL_STRING
  }

  return value
}
