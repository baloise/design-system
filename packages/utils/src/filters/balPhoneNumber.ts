import { BalUtil } from '../utils/util'

export interface PhoneNumber {
  countryCode: string
  phoneNumber: string
}

/**
 * @description
 * Formats the given phone.
 *
 * @example
 * balPhoneNumber('41,41564410808') => +41 56 441 08 08
 * balPhoneNumber({ countryCode: '41', phoneNumber: '564410808' }) => +41 56 441 08 08
 */
export const balPhoneNumber = (value: string | PhoneNumber): string => {
  if (value === null || value === undefined) {
    return ''
  }

  let prefix
  let number

  if (BalUtil.isString(value)) {
    let split = (<string>value).split(',')
    prefix = split[0]
    number = split[1]
  } else {
    prefix = (value as PhoneNumber).countryCode
    number = (value as PhoneNumber).phoneNumber
  }

  if (!number || !prefix) {
    return ''
  }

  const swissPhoneNumberPattern = new RegExp(
    `(?:(?:|0{0,2}|\\+{0,2})${prefix}(?:|\\(0\\))|0{0,1})\\s*([1-9]\\d)\\s*(\\d{3})\\s*(\\d{2})\\s*(\\d{2})(.*)`,
  )
  let match = number.match(swissPhoneNumberPattern)

  function removeLeadingZero(phone: string): string {
    return phone.startsWith('0') ? phone.substring(1) : phone
  }

  if (!match) {
    return ''
  } else if (match[5] !== '') {
    return `+${prefix} ${removeLeadingZero(number)}`
  } else {
    return `+${prefix} ${match[1]} ${match[2]} ${match[3]} ${match[4]}`
  }
}
