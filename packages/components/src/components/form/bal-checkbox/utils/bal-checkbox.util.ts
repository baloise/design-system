import { Props } from '../../../../types'
import { BalCheckboxOption } from '../bal-checkbox.type'

type HtmlFunction = () => string

interface Option {
  value: any
  label: HtmlFunction | string
  name?: string
  checked?: boolean
  labelHidden?: boolean
  flat?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  hidden?: boolean
  invalid?: boolean
  interface?: Props.BalCheckboxInterface
}

export const newBalCheckboxOption = (option: Option): BalCheckboxOption => {
  return {
    interface: 'checkbox',
    labelHidden: false,
    flat: false,
    disabled: false,
    readonly: false,
    required: false,
    hidden: false,
    invalid: false,
    checked: false,
    ...option,
    label: '',
    html: option.label,
  }
}
