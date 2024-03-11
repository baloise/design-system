import { BalTabOption } from './bal-tab.type'

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
  hidden?: boolean // deprecated
}

export const newBalTabOption = (option: Option): BalTabOption => {
  return {
    href: '',
    target: '_self',
    bubble: false,
    active: false,
    disabled: false,
    hidden: false,
    invisible: false,
    prevent: false,
    navigate: undefined as any,
    ...option,
  }
}
