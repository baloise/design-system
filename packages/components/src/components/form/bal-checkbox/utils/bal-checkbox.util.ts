import { Props } from '../../../../types'
import { BalCheckboxOption } from '../bal-checkbox.type'

interface Option {
  name: string
  value: any
  checked?: boolean
  labelHidden?: boolean
  flat?: boolean
  interface?: Props.BalCheckboxInterface
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  hidden?: boolean
  invalid?: boolean
}

export const newBalCheckboxOption = (option: Option): BalCheckboxOption => {
  return {
    checked: false,
    labelHidden: false,
    flat: false,
    interface: 'checkbox',
    disabled: false,
    readonly: false,
    required: false,
    hidden: false,
    invalid: false,
    ...option,
  }
}
