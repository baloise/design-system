import { isString } from './balUtil'

export function round(value: number, digits: number = 0): string {
  let multiplicator = Math.pow(10, digits)
  value = parseFloat((value * multiplicator).toFixed(11))
  let test = Math.round(value) / multiplicator
  return test.toFixed(digits)
}

export function parseNumber(value: any): number | undefined {
  let num = parseFloat(value)
  if (isString(value)) {
    num = cleanMonetaryNumber(value)
  }
  return isValidNumber(num) ? num : undefined
}

export function isValidNumber(value: number): boolean {
  return !isNaN(value) && isFinite(value)
}

export function isValidNumberWithSeparators(stringValue: string): boolean {
  let numberValue = cleanMonetaryNumber(stringValue)
  return !isNaN(numberValue) && isFinite(numberValue)
}

function cleanMonetaryNumber(stringValue: string): number {
  stringValue = stringValue.replace(/'/g, '')
  stringValue = stringValue.replace(/‘/g, '')
  stringValue = stringValue.replace(/’/g, '')
  stringValue = stringValue.replace(/,/g, '.')

  return Number(stringValue)
}
