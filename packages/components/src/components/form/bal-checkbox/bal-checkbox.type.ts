import { Props } from '../../../types'

type HtmlFunction = () => string

export interface BalCheckboxOption {
  name: string
  value: any
  checked: boolean
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
