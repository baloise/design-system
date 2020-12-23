/**
 * toClaimNumber is filter/pipe, which transforms string values.
 * Pass in a number string and get out a formatted claim number.
 *
 * "73001217169" => "93/001217/16.9
 */
export const toClaimNumber = (claimNumber: string): string => {
  if (!claimNumber) {
    return ''
  }
  const parts = claimNumber.match(/^(\d{2})(\d{6})(\d{2})(\w{1})$/)
  if (!parts) {
    return claimNumber
  }
  return `${parts[1]}/${parts[2]}/${parts[3]}.${parts[4]}`
}
