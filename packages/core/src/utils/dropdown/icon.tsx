import { FunctionalComponent, h } from '@stencil/core'
import { BalLanguage } from '../config'
import { BEM } from '../bem'
import { i18nBalDropdown } from './dropdown.i18n'

export interface DropdownIconProps {
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
    return <bal-spinner small variation="circle"></bal-spinner>
  } else if (clearable && filled && !disabled) {
    return (
      <button
        title={i18nBalDropdown[language].clearable}
        class={{
          ...block.element('clear').class(),
          ...block.element('clear').modifier('invalid').class(invalid),
        }}
      >
        <bal-icon name={'close-circle'} size="" color={'grey'}></bal-icon>
      </button>
    )
  } else {
    return <bal-icon name={icon} turn={expanded} color={disabled ? 'grey' : invalid ? 'danger' : 'primary'}></bal-icon>
  }
}
