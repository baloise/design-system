import { Props } from '../../../types'

type HtmlFunction = () => string

export interface BalCheckboxOption {
  value: any
  checked: boolean
  name?: string
  label?: string
  html?: HtmlFunction | string
  labelHidden: boolean
  flat: boolean
  interface: Props.BalCheckboxInterface
  disabled: boolean
  readonly: boolean
  required: boolean
  hidden: boolean
  invalid: boolean
}
