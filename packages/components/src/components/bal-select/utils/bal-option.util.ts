import { BalOptionValue } from './bal-option.type'

export const NewBalOptionValue = <T>(value: string, label: string, disabled = false, data?: T): BalOptionValue<T> => {
  return {
    value,
    label,
    disabled,
    data,
  }
}

export const NewBalSingleOptionValue = <T>(valueAndLabel: string, disabled = false, data?: T): BalOptionValue<T> => {
  return NewBalOptionValue(valueAndLabel, valueAndLabel, disabled, data)
}
