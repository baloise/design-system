/**
 * Returns the char which separates day form month and year.
 *
 * ```typescript
 * dateSeparator('de-CH')
 * // .
 * ```
 */
export function dateSeparator(locale = 'de-CH'): string {
  return new Intl.DateTimeFormat(dateLocale(locale))
    .format(new Date())
    .replace(/\p{Number}/gu, '')
    .charAt(0)
}

/**************************************************************
 * PRIVATE
 **************************************************************/

function dateLocale(locale = 'de-CH'): string {
  const [, region] = locale.split('-')
  if (region === 'CH') {
    return 'fr-CH'
  }
  if (region === 'BE') {
    return 'fr-BE'
  }
  if (region === 'LU') {
    return 'fr-LU'
  }
  return locale
}
