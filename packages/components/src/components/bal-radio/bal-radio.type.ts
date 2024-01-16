type HtmlFunction = () => string

export interface BalRadioOption {
  value: any
  label: string
  name?: string
  html?: HtmlFunction | string
  labelHidden: boolean
  flat: boolean
  interface: BalProps.BalRadioInterface
  disabled: boolean
  readonly: boolean
  required: boolean
  nonSubmit: boolean
  invisible: boolean
  invalid: boolean
  hidden: boolean // deprecated
}
