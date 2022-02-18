import { formatLocaleNumber, getDecimalSeparator } from '../../../utils/number.util'
import isNaN from 'lodash.isnan'

export const filterInputValue = (
  value: string,
  oldValue: string | number | undefined,
  decimalPoints: number | undefined = undefined,
): string => {
  const regex = /^(((0|[1-9]\d*)?)(\.\d*)?)$/g
  let regexString = regex.source

  const decimalSeparator = getDecimalSeparator()
  if (decimalSeparator !== '.') {
    regexString = regexString.replace('(\\.\\d*)?)$', `(\\${decimalSeparator}\\d*)?)$`)
  }

  if (decimalPoints === 0) {
    regexString = /^[0-9]*$/g.source
  } else if (decimalPoints !== undefined && decimalPoints > 0) {
    regexString = regexString.replace('d*)?)$', `d{0,${decimalPoints}})?)$`)
  }
  const regexp = new RegExp(regexString, 'g')

  if (regexp.test(value)) {
    return value
  }
  return oldValue === undefined ? '' : `${oldValue}`
}

export const formatInputValue = (value: string, decimalPoints: number | undefined = undefined): string => {
  if (value.charAt(0) === getDecimalSeparator()) {
    value = `0${value}`
  }

  const num = decimalPoints === 0 ? parseInt(value, 10) : parseFloat(value)
  return isNaN(num) ? '' : formatLocaleNumber(num, decimalPoints)
}
