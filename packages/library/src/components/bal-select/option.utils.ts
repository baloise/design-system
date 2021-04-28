import { BalOptionController } from '../bal-select-option/bal-select-option'

export function addOption(options: BalOptionController[], option: BalOptionController): BalOptionController[] {
  return [...options, option]
}

export function updateOption(options: BalOptionController[], optionToUpdate: BalOptionController): BalOptionController[] {
  const copyOfOptions = [...options]
  for (let index = 0; index < copyOfOptions.length; index++) {
    const option = copyOfOptions[index]
    if (option.value === optionToUpdate.value) {
      copyOfOptions[index] = optionToUpdate
    }
  }
  return copyOfOptions
}

export function removeOption(options: BalOptionController[], optionToRemove: BalOptionController): BalOptionController[] {
  const copyOfOptions = []
  for (let index = 0; index < options.length; index++) {
    const option = options[index]
    if (option.value !== optionToRemove.value) {
      copyOfOptions.push(option)
    }
  }
  return copyOfOptions
}

export function findOptionByValue(options: BalOptionController[], value: string): BalOptionController | undefined {
  if (options.length > 0) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.value === value) {
        return option
      }
    }
  }

  return undefined
}

export function findOptionByLabel(options: BalOptionController[], label: string): BalOptionController | undefined {
  if (options.length > 0) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.label === label) {
        return option
      }
    }
  }

  return undefined
}

export function findLabelByValue(options: BalOptionController[], value: string): string {
  const option = findOptionByValue(options, value)
  if (option !== undefined) {
    return option.label
  }

  return ''
}
