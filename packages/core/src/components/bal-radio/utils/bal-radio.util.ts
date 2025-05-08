import { BalRadioOption } from '../bal-radio.type'

type HtmlFunction = () => string

interface Option {
  value: any
  label: HtmlFunction | string
  name?: string
  labelHidden?: boolean
  flat?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  nonSubmit?: boolean
  invalid?: boolean
  interface?: BalProps.BalRadioInterface
}

export const newBalRadioOption = (option: Option): BalRadioOption => {
  return {
    interface: 'radio',
    labelHidden: false,
    flat: false,
    disabled: false,
    readonly: false,
    required: false,
    nonSubmit: false,
    invalid: false,
    ...option,
    label: '',
    html: option.label,
  }
}
