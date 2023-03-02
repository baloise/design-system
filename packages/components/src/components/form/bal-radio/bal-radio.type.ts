import { Props } from '../../../types'

type HtmlFunction = () => string

export interface BalRadioOption {
  name: string
  value: any
  label: string
  html?: HtmlFunction | string
  labelHidden: boolean
  flat: boolean
  interface: Props.BalRadioInterface
  disabled: boolean
  readonly: boolean
  required: boolean
  hidden: boolean
  invalid: boolean
}
