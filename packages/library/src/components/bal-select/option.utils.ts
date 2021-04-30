import { isNil } from 'lodash'
import { BalOptionController } from '../bal-select-option/bal-select-option'

export function addOption(options: Map<string, BalOptionController>, option: BalOptionController): Map<string, BalOptionController> {
  options.set(option.value, option)
  return new Map(options)
}

export function updateOption(options: Map<string, BalOptionController>, optionToUpdate: BalOptionController): Map<string, BalOptionController> {
  options.set(optionToUpdate.value, optionToUpdate)
  return new Map(options)
}

export function removeOption(options: Map<string, BalOptionController>, optionToRemove: BalOptionController): Map<string, BalOptionController> {
  options.delete(optionToRemove.value)
  return new Map(options)
}

export function findOptionByValue(options: Map<string, BalOptionController>, value: string): BalOptionController | undefined {
  return options.get(value)
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
  const option = findOptionByValue(options, value)
  if (option !== undefined) {
    return option.label
  }

  return ''
}
