/**
 *
 * @param value - input number
 * @output 73/001217/16.9
 * @private
 */
export function formatClaim(value: string): string {
  if (!value) {
    return ''
  }
  const newValue = `${value}`.trim().toUpperCase()
  const parts = [
    newValue.substring(0, 2),
    newValue.substring(2, 8),
    newValue.substring(8, 10),
    newValue.substring(10, 11),
  ].filter(val => val.length > 0)
  switch (parts.length) {
    case 1:
      return `${value}`
    case 2:
      return `${parts[0]}/${parts[1]}`
    case 3:
      return `${parts[0]}/${parts[1]}/${parts[2]}`
    default:
      return `${parts[0]}/${parts[1]}/${parts[2]}.${parts[3]}`
  }
}

/**
 *
 * @param value: input number
 * @output 99/1.234.567-1
 * @private
 */
export function formatPolicy(value: string): string {
  if (!value) {
    return ''
  }
  let newValue = `${value}`.trim()
  const parts = [newValue.substring(0, 9), newValue.substring(9, 10)].filter(val => val.length > 0)
  newValue = formatOffer(parts[0])

  return parts[1] ? `${newValue}-${parts[1]}` : newValue
}

/**
 *
 * @param value: input number
 * @output 98/7.654.321
 * @private
 */
export function formatOffer(value: string): string {
  if (!value) {
    return ''
  }
  const newValue = `${value}`.trim()
  const parts = [
    newValue.substring(0, 2),
    newValue.substring(2, 3),
    newValue.substring(3, 6),
    newValue.substring(6, 9),
  ].filter(val => val.length > 0)
  switch (parts.length) {
    case 1:
      return `${newValue}`
    case 2:
      return `${parts[0]}/${parts[1]}`
    case 3:
      return `${parts[0]}/${parts[1]}.${parts[2]}`
    default:
      return `${parts[0]}/${parts[1]}.${parts[2]}.${parts[3]}`
  }
}

/**
 *
 * @param value: input number
 * @output 1234.567.890
 * @private
 */
export function formatBeEnterpriseNumber(value: string): string {
  if (!value) {
    return ''
  }
  const newValue = `${value}`.trim()
  const parts = [newValue.substring(0, 4), newValue.substring(4, 7), newValue.substring(7, 10)].filter(
    val => val.length > 0,
  )
  switch (parts.length) {
    case 1:
      return `${newValue}`
    case 2:
      return `${parts[0]}.${parts[1]}`
    default:
      return `${parts[0]}.${parts[1]}.${parts[2]}`
  }
}

/**
 *
 * @param value: input number
 * @output BE68 5390 0754 7034
 * @private
 */
export function formatBeIBAN(value: string): string {
  if (!value) {
    return ''
  }
  const newValue = `${value}`.trim()
  const parts = [
    newValue.substring(0, 2),
    newValue.substring(2, 6),
    newValue.substring(6, 10),
    newValue.substring(10, 14),
  ].filter(val => val.length > 0)
  switch (parts.length) {
    case 1:
      return `BE${newValue}`
    case 2:
      return `BE${parts[0]} ${parts[1]}`
    case 3:
      return `BE${parts[0]} ${parts[1]} ${parts[2]}`
    default:
      return `BE${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`
  }
}

export const MAX_LENGTH_CONTRACT_NUMBER = 10
export const MAX_LENGTH_OFFER_NUMBER = 9
export const MAX_LENGTH_CLAIM_NUMBER = 11
export const MAX_LENGTH_BE_ENTERPRISE_NUMBER = 10
export const MAX_LENGTH_BE_IBAN = 14
