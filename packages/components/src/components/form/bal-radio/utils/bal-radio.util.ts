import { isFunction } from 'lodash'
import { BalRadioOption } from '../bal-radio.type'

type HtmlFunction = () => string

interface Option {
  name: string
  value: any
  label: HtmlFunction | string
  labelHidden?: boolean
  flat?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  hidden?: boolean
  invalid?: boolean
}

export const newBalRadioOption = (option: Option): BalRadioOption => {
  return {
    interface: 'radio',
    labelHidden: false,
    flat: false,
    disabled: false,
    readonly: false,
    required: false,
    hidden: false,
    invalid: false,
    ...option,
    label: '',
    html: option.label,
  }
}
