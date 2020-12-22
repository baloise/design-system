import { BalOptionValue } from "./bal-select-option.type"

export const NewBalOptionValue = <T>(value: string, label: string, data?: T): BalOptionValue<T> => {
  return {
    value,
    label,
    data,
  }
}
