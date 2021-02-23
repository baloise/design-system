/**
 * @description
 * Formats the claim-number correctly.
 *
 * @example
 * balClaimNumber('73001217169') => 73/001217/16.9
 */
export const balClaimNumber = (value: string | undefined | null | number): string => {
  if (!value) {
    return ''
  }
  value = `${value}`
  const parts = value.match(/^(\d{2})(\d{6})(\d{2})(\w{1})$/)
  if (!parts) {
    return value
  }
  return `${parts[1]}/${parts[2]}/${parts[3]}.${parts[4]}`
}
