import { BalOptionController } from '../bal-select-option/bal-select-option'
import { findOptionByLabel, findOptionByValue } from './option.utils'

export function removeValue(value: string[], valueToRemove: string): string[] {
  const copyOfValues = []
  for (let index = 0; index < value.length; index++) {
    if (value[index] !== valueToRemove) {
      copyOfValues.push(value[index])
    }
  }
  return copyOfValues
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

export function validateAfterBlur(values: string[], options: BalOptionController[], typedLabel: string): string[] {
  if (values.length > 0) {
    const valueOption = findOptionByValue(options, values[0])
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
