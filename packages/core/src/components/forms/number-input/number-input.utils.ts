import isNaN from 'lodash/isNaN'
import isNil from 'lodash/isNil'
import { ACTION_KEYS, NUMBER_KEYS } from '@global'
import { formatLocaleNumber, getDecimalSeparator, getNegativeSymbol, getThousandSeparator } from '@utils'

function checkIfValueIsStringAndDoesNotHaveGermanFormat(val: any): boolean {
  return typeof val === 'string' && getThousandSeparator() !== '.'
}

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

  if (checkIfValueIsStringAndDoesNotHaveGermanFormat(val)) {
    val = val.split(getThousandSeparator()).join('').split('`').join('').split("'").join('')
  }

  if (typeof val === 'string') {
    val = val.replace(getDecimalSeparator(), '.')
  }

  return decimalPoints === 0 ? parseInt(val, 10) : parseFloat(val)
}

export function toFixedNumber(value: string, decimalPoints = 0): string {
  let val = value
  if (isNil(val)) {
    return ''
  }

  if (checkIfValueIsStringAndDoesNotHaveGermanFormat(val)) {
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
  onlyPositive: boolean
}

// Virtually every mobile numeric/decimal keypad emits "." for its decimal key regardless of
// device locale, even when the app's configured decimal separator differs (e.g. ","). Accepting
// both keeps decimal entry working across platforms instead of only the exact locale symbol.
function isDecimalSeparatorKey(key: string): boolean {
  return key === getDecimalSeparator() || key === '.'
}

export const countDecimalSeparators = (value: string): number => {
  const separator = getDecimalSeparator()
  const chars = separator === '.' ? [separator] : [separator, '.']
  return chars.reduce((count, char) => count + ((value.split(char) || []).length - 1 || 0), 0)
}

export function validateKeyDown({
  key,
  ctrlKey,
  metaKey,
  selectionStart,
  selectionEnd,
  newValue,
  decimal,
  onlyPositive,
}: ValidateKeyDownOptions): boolean {
  //
  // allow select all, copy and paste
  if (['a', 'c', 'v'].includes(key) && (ctrlKey || metaKey)) {
    return true
  }

  //
  // mobile IMEs (notably Android/Chrome) often fire keydown with an unreliable `key`
  // (e.g. "Unidentified") for on-screen keypress. It can't be validated up front, so let it
  // through and rely on the post-input number check (handleInput/isNotNumber) as the safety net.
  if (!key || key === 'Unidentified' || key === 'Dead' || key === 'Process') {
    return true
  }

  //
  // only allow negative symbols at the start of the input
  if (key === getNegativeSymbol()) {
    if (onlyPositive) {
      return false
    } else {
      if (selectionStart && selectionStart > 0 && selectionEnd && selectionEnd > 0) {
        return false
      }
    }
  }

  const isDecimalKey = isDecimalSeparatorKey(key)

  //
  // only allow decimal separator
  if (isDecimalKey) {
    if (decimal === 0) {
      return false
    } else if (countDecimalSeparators(newValue) > 1) {
      return false
    }
  }

  //
  // check if it is an allowed key
  if (!isDecimalKey && ![...NUMBER_KEYS, ...ACTION_KEYS, getNegativeSymbol()].includes(key)) {
    return false
  }

  //
  // check if decimal points are reached
  if (decimal !== 0 && NUMBER_KEYS.includes(key)) {
    const separatorIndex = Math.max(newValue.lastIndexOf(getDecimalSeparator()), newValue.lastIndexOf('.'))
    if (separatorIndex !== -1) {
      const decimalPart = newValue.slice(separatorIndex + 1)
      if (decimalPart.length > decimal) {
        return false
      }
    }
  }

  return true
}
