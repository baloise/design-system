import { BalStepOption } from './bal-step.type'

interface Option {
  value: string
  label: string
  href?: string
  target?: BalProps.BalButtonTarget
  active?: boolean
  disabled?: boolean
  done?: boolean
  invisible?: boolean
  failed?: boolean
  prevent?: boolean
  hidden?: boolean // deprecated use invisible instead
}

export const newBalStepOption = (option: Option): BalStepOption => {
  return {
    href: '',
    target: '_self',
    active: false,
    disabled: false,
    done: false,
    invisible: !!option.hidden || !!option.invisible,
    failed: false,
    prevent: false,
    ...option,
  }
}
