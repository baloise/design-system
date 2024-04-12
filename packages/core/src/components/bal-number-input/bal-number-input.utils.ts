import isNil from 'lodash.isnil'
import { ACTION_KEYS, NUMBER_KEYS } from '../../utils/constants/keys.constant'
import { formatLocaleNumber, getDecimalSeparator, getNegativeSymbol, getThousandSeparator } from '../../utils/number'
import isNaN from 'lodash.isnan'

export function isNumber(value: any): boolean {
  const num = parseFloat(value)
  return typeof num === 'number' && !isNaN(num)
}

export function isNotNumber(value: any): boolean {
  return !isNumber(value) && value !== '' && value !== getNegativeSymbol() && value !== getDecimalSeparator()
}

export function toNumber(value: any, decimalPoints = 0): number | undefined {
  let val = value
  if (
    val === '' ||
    val === undefined ||
    val === null ||
    isNaN(val) ||
    val === getNegativeSymbol() ||
    val === getDecimalSeparator() ||
    !isNumber(val)
  ) {
    return undefined
  }

  if (typeof val === 'string') {
    val = val.split(getThousandSeparator()).join('').split('`').join('').split("'").join('')
  }

  return decimalPoints === 0 ? parseInt(val, 10) : parseFloat(val)
}

export function toFixedNumber(value: string, decimalPoints = 0): string {
  let val = value
  if (isNil(val)) {
    return ''
  }

  if (typeof val === 'string') {
    val = val.split(getThousandSeparator()).join('').split('`').join('').split("'").join('')
  }

  if (val.charAt(0) === getDecimalSeparator()) {
    val = `0${val}`
  }

  const num = decimalPoints === 0 ? parseInt(val, 10) : parseFloat(val.replace(getDecimalSeparator(), '.'))
  return isNaN(num) ? '' : num.toFixed(decimalPoints)
}

export function mapDecimalSeparator(value: string): string {
  return value.replace('.', getDecimalSeparator())
}

export function toUserFormattedNumber(value: string, decimalPoints = 0, suffix = ''): string {
  if (isNil(value)) {
    return ''
  }

  if (value.charAt(0) === getDecimalSeparator()) {
    value = `0${value}`
  }

  const num = decimalPoints === 0 ? parseInt(value, 10) : parseFloat(value)
  const formattedSuffix = suffix !== '' ? ` ${suffix.trim()}` : ''
  return isNaN(num) ? '' : formatLocaleNumber(num, decimalPoints) + formattedSuffix
}

export type ValidateKeyDownOptions = {
  decimal: number
  key: string
  ctrlKey: boolean
  metaKey: boolean
  newValue: string
  oldValue: string
  selectionStart: number | null
  selectionEnd: number | null
}

export const countDecimalSeparators = (value: string) => (value.split(getDecimalSeparator()) || []).length - 1 || 0

export function validateKeyDown({
  key,
  ctrlKey,
  metaKey,
  selectionStart,
  selectionEnd,
  newValue,
  decimal,
}: ValidateKeyDownOptions): boolean {
  //
  // allow select all, copy and paste
  if (['a', 'c', 'v'].includes(key) && (ctrlKey || metaKey)) {
    return true
  }

  //
  // only allow negative symbols at the start of the input
  if (key === getNegativeSymbol() && selectionStart && selectionStart > 0 && selectionEnd && selectionEnd > 0) {
    return false
  }

  //
  // only allow decimal separator
  if (key === getDecimalSeparator()) {
    if (decimal === 0) {
      return false
    } else if (countDecimalSeparators(newValue) > 1) {
      return false
    }
  }

  //
  // check if it is an allowed key
  if (![...NUMBER_KEYS, ...ACTION_KEYS, getDecimalSeparator(), getNegativeSymbol()].includes(key)) {
    return false
  }

  //
  // check if decimal points are reached
  if (decimal !== 0 && newValue.includes(getDecimalSeparator()) && [...NUMBER_KEYS].includes(key)) {
    const newValueParts = newValue.split(getDecimalSeparator())
    const decimalPart = newValueParts[newValueParts.length - 1]
    if (decimalPart.length > decimal) {
      return false
    }
  }

  return true
}
