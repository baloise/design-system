import { BalOptionValue } from './bal-option.type'

export const newBalOptionValue = <T>(value: string, label: string, disabled = false, data?: T): BalOptionValue<T> => {
  return {
    value,
    label,
    disabled,
    data,
  }
}

export const newBalSingleOptionValue = <T>(valueAndLabel: string, disabled = false, data?: T): BalOptionValue<T> => {
  return newBalOptionValue(valueAndLabel, valueAndLabel, disabled, data)
}
