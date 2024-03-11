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
  nonSubmit?: boolean
  invalid?: boolean
  interface?: BalProps.BalCheckboxInterface
  hidden?: boolean // deprecated
}

export const newBalCheckboxOption = (option: Option): BalCheckboxOption => {
  return {
    interface: 'checkbox',
    labelHidden: false,
    flat: false,
    disabled: false,
    readonly: false,
    required: false,
    nonSubmit: false,
    invalid: false,
    checked: false,
    hidden: false, // deprecated
    ...option,
    label: '',
    html: option.label,
  }
}
