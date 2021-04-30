import { isNil, lowerCase, trim } from 'lodash'
import { BalOptionController } from '../bal-select'

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

export function validateAfterBlur(values: string[], options: Map<string, BalOptionController>, typedLabel: string): string[] {
  if (values.length > 0) {
    const valueOption = options.get(values[0])
    if (isNil(valueOption) || typedLabel !== valueOption.label) {
      return []
    }
  } else {
    const typedOption = findOptionByLabel(options, typedLabel)
    if (!isNil(typedOption)) {
      return addValue(values, typedOption.value, false)
    }
  }

  return values
}

function findOptionByLabelIterator(iterator: IterableIterator<BalOptionController>, label: string): BalOptionController | undefined {
  const { value, done } = iterator.next()
  if (!isNil(value) && value.label === label) {
    return value
  }
  if (done) {
    return undefined
  }

  return findOptionByLabelIterator(iterator, label)
}

export function findOptionByLabel(options: Map<string, BalOptionController>, label: string): BalOptionController | undefined {
  return findOptionByLabelIterator(options.values(), label)
}

export function findLabelByValue(options: Map<string, BalOptionController>, value: string): string {
  const option = options.get(value)
  if (!isNil(option)) {
    return option.label
  }

  return ''
}

export function startsWith(text: string, input: string): boolean {
  const content = lowerCase(trim(text))
  const value = lowerCase(trim(input))
  return content.startsWith(value)
}

export function includes(text: string, input: string): boolean {
  const content = lowerCase(trim(text))
  const value = lowerCase(trim(input))
  return content.includes(value)
}

export function preventDefault(ev: Event) {
  ev.preventDefault()
  ev.stopPropagation()
}
