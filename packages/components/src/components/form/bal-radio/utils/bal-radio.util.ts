import { Props } from '../../../../types'
import { BalRadioOption } from '../bal-radio.type'

interface Option {
  name: string
  value: any
  label: string
  labelHidden?: boolean
  flat?: boolean
  interface?: Props.BalRadioInterface
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  hidden?: boolean
  invalid?: boolean
}

export const newBalRadioOption = (option: Option): BalRadioOption => {
  return {
    labelHidden: false,
    flat: false,
    interface: 'radio',
    disabled: false,
    readonly: false,
    required: false,
    hidden: false,
    invalid: false,
    ...option,
  }
}
