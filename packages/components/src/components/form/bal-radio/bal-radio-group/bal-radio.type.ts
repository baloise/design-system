import { Props } from '../../../../..'

export interface BalRadioOption {
  name: string
  value: any
  label: string
  labelHidden: boolean
  flat: boolean
  interface: Props.BalRadioInterface
  disabled: boolean
  readonly: boolean
  required: boolean
  hidden: boolean
  invalid: boolean
}
