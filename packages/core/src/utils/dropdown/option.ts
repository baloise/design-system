export type BalBaseOption<TValue = string> = {
  value: TValue
  label: string
}

export type BalOptionOptions = {
  // state values
  disabled: boolean
  invalid: boolean
  selected: boolean
  focused: boolean
  hidden: boolean
  // visual values
  multiline: boolean
  checkbox: boolean
}

export type BalOption<TValue = string> = BalBaseOption<TValue> & BalOptionOptions

export const createOption = <TValue = string>(option: BalOption<TValue>, options?: Partial<BalOptionOptions>): BalOption<TValue> => {
  const data: BalOption<TValue> = {
    ...option,
    disabled: false,
    invalid: false,
    selected: false,
    focused: false,
    hidden: false,
    multiline: false,
    checkbox: false,
  }

  if (options) {
    data.disabled = options.disabled === undefined ? data.disabled : options.disabled
    data.invalid = options.invalid === undefined ? data.invalid : options.invalid
    data.selected = options.selected === undefined ? data.selected : options.selected
    data.focused = options.focused === undefined ? data.focused : options.focused
    data.hidden = options.hidden === undefined ? data.hidden : options.hidden
    data.multiline = options.multiline === undefined ? data.multiline : options.multiline
    data.checkbox = options.checkbox === undefined ? data.checkbox : options.checkbox
  }

  return data
}
