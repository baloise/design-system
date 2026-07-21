import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../bem'
import { BalLanguage } from '../config'
import { i18nBalDropdown } from './dropdown.i18n'

export interface DropdownIconProps {
  size: BalProps.BalDropdownSize
  theme: BalProps.BalDropdownTheme
  language: BalLanguage
  loading: boolean
  clearable: boolean
  filled: boolean
  disabled: boolean
  invalid: boolean
  expanded: boolean
  icon: string
}

export const DropdownIcon: FunctionalComponent<DropdownIconProps> = ({
  size,
  theme,
  icon,
  language,
  loading,
  clearable,
  invalid,
  filled,
  expanded,
  disabled,
}) => {
  const block = BEM.block('dropdown')

  if (loading) {
    return (
      <bal-spinner class={{ ...block.element('rear').class() }} small variation="circle" color="white"></bal-spinner>
    )
  } else if (clearable && filled && !disabled) {
    return (
      <button
        title={i18nBalDropdown[language].clearable}
        type={'button'}
        tabIndex={-1}
        class={{
          ...block.element('rear').class(),
          ...block.element('clear').class(),
          ...block.element('clear').modifier('invalid').class(invalid),
          ...block
            .element('clear')
            .modifier('theme-purple')
            .class(theme === 'purple'),
        }}
      >
        <bal-icon
          class={{ ...block.element('rear').class() }}
          name={theme === 'purple' ? 'close' : 'close-circle'}
          size={size}
          color={theme === 'purple' ? 'primary' : 'grey'}
        ></bal-icon>
      </button>
    )
  } else {
    return (
      <bal-icon
        class={{ ...block.element('rear').class() }}
        name={icon}
        size={size}
        turn={expanded}
        color={disabled ? 'grey' : invalid ? 'danger' : 'primary'}
      ></bal-icon>
    )
  }
}
