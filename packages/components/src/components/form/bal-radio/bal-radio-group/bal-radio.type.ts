import { Props } from '../../../../..'

// type PropertyFunction<T> = () => T

export interface BalRadioOption {
  name: string
  value: any
  labelHidden: boolean
  flat: boolean
  interface: Props.BalRadioInterface
  disabled: boolean
  readonly: boolean
  required: boolean
  hidden: boolean
  invalid: boolean
  // label: string | PropertyFunction<string>
  label: string
}
