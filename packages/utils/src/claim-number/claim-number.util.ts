/**
 * Formats the claim-number correctly.
 */
export const toClaimNumber = (claimNumber: string) => {
  if (!claimNumber) {
    return ''
  }
  const parts = claimNumber.match(/^(\d{2})(\d{6})(\d{2})(\w{1})$/)
  if (!parts) {
    return claimNumber
  }
  return `${parts[1]}/${parts[2]}/${parts[3]}.${parts[4]}`
}
