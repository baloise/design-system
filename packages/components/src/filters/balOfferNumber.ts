import { isEmpty } from 'lodash'

/**
 * Transforms the input string into a offer number.
 *
 * ```typescript
 * balOfferNumber('987654321') // 98/7.654.321
 * ```
 */
export function balOfferNumber(value: string | null | undefined, varianteNr?: string): string {
  if (!isEmpty(value)) {
    const offertNrNoLeadingZeros = parseInt(value as string, 10).toString(10)
    if (offertNrNoLeadingZeros && offertNrNoLeadingZeros.length === 9) {
      return (
        offertNrNoLeadingZeros.substr(0, 2) +
        '/' +
        offertNrNoLeadingZeros.substr(2, 1) +
        '.' +
        offertNrNoLeadingZeros.substr(3, 3) +
        '.' +
        offertNrNoLeadingZeros.substr(6, 3) +
        (varianteNr ? ' / ' + varianteNr : '')
      )
    }
  }
  return ''
}
