/**
 * @description
 * Transforms the input string into a offer number.
 *
 * @example
 * balOfferNumber('987654321') => 98/7.654.321
 */
export const balOfferNumber = (value: string, varianteNr?: string): string => {
  if (value) {
    const offertNrNoLeadingZeros = parseInt(value, 10).toString(10)
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
