import { Props } from '../../types'
import { BalStepOption } from './bal-step.type'

interface Option {
  value: string
  label: string
  href?: string
  target?: Props.BalButtonTarget
  active?: boolean
  disabled?: boolean
  done?: boolean
  hidden?: boolean
  failed?: boolean
  prevent?: boolean
}

export const newBalStepOption = (option: Option): BalStepOption => {
  return {
    href: '',
    target: '_self',
    active: false,
    disabled: false,
    done: false,
    hidden: false,
    failed: false,
    prevent: false,
    ...option,
  }
}
