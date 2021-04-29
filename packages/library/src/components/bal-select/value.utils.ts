import { BalOptionController } from '../bal-select-option/bal-select-option'
import { findOptionByLabel } from './option.utils'

export function removeValue(values: string[], valueToRemove: string): string[] {
  return values.filter(value => value !== valueToRemove)
}

export function addValue(values: string[], valueToAdd: string, hasMultipleValue: boolean) {
  if (hasMultipleValue) {
    if (values.includes(valueToAdd)) {
      return removeValue(values, valueToAdd)
    }
    return [...values, valueToAdd]
  }
  return [valueToAdd]
}

export function compareValueWithInput(text: string, input: string): boolean {
  text = text.toLocaleLowerCase()
  input = input.toLocaleLowerCase()
  return text.indexOf(input) >= 0
}

export function validateAfterBlur(values: string[], options: Map<string, BalOptionController>, typedLabel: string): string[] {
  if (values.length > 0) {
    const valueOption = options.get(values[0])
    if (valueOption && typedLabel !== valueOption?.label) {
      return []
    }
  } else {
    const typedOption = findOptionByLabel(options, typedLabel)
    if (typedOption) {
      return addValue(values, typedOption.value, false)
    }
  }

  return values
}
