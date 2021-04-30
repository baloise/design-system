import { BalOptionValue } from './bal-option.type'

export const NewBalOptionValue = <T>(value: string, label: string, data?: T): BalOptionValue<T> => {
  return {
    value,
    label,
    data,
  }
}

export const NewBalSingleOptionValue = <T>(valueAndLabel: string, data?: T): BalOptionValue<T> => {
  return NewBalOptionValue(valueAndLabel, valueAndLabel, data)
}
