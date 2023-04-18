import { Props } from '../../../../types'
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
  hidden?: boolean
  invalid?: boolean
  interface?: Props.BalRadioInterface
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
    invisible: false,
    invalid: false,
    ...option,
    label: '',
    html: option.label,
  }
}
