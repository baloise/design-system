import { FunctionalComponent, h } from '@stencil/core'
import { ariaBooleanToString } from '../aria'
import { Attributes } from '../attributes'
import { BEM } from '../bem'
import { BalLanguage } from '../config'
import { BalAriaForm } from '../form'
import { i18nBalDropdown } from './dropdown.i18n'

export interface DropdownInputProps {
  inputId: string
  httpFormSubmit: boolean
  ariaForm: BalAriaForm
  rawValue: string[]
  autocomplete: string
  placeholder: string
  inputLabel: string
  required: boolean
  disabled: boolean
  readonly: boolean
  expanded: boolean
  invalid: boolean
  language: BalLanguage
  inheritedAttributes: Attributes
  refInputEl: (el: HTMLInputElement | undefined) => void
  onChange: (ev: Event) => void
  onFocus: (ev: FocusEvent) => void
  onBlur: (ev: FocusEvent) => void
  onKeyDown: (ev: KeyboardEvent) => void
}

export const DropdownInput: FunctionalComponent<DropdownInputProps> = ({
  inputId,
  httpFormSubmit,
  ariaForm,
  rawValue,
  autocomplete,
  required,
  disabled,
  readonly,
  placeholder,
  expanded,
  invalid,
  language,
  inputLabel,
  inheritedAttributes,
  refInputEl,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const block = BEM.block('dropdown')

  const Input = () => (
    <input
      id={ariaForm.controlId || `${inputId}-ctrl`}
      class={{
        ...block.element('root').element('input').class(),
      }}
      type="text"
      size={1}
      inputmode="none"
      tabindex="0"
      autoComplete={autocomplete}
      value={rawValue.join(',')}
      required={required}
      disabled={disabled}
      readonly={readonly}
      placeholder={placeholder}
      title={expanded ? i18nBalDropdown[language].close : i18nBalDropdown[language].open}
      aria-label={expanded ? i18nBalDropdown[language].close : i18nBalDropdown[language].open}
      aria-owns={`${inputId}-menu`}
      aria-invalid={ariaBooleanToString(invalid)}
      aria-disabled={ariaBooleanToString(disabled || readonly)}
      aria-labelledby={ariaForm.labelId}
      aria-describedby={ariaForm.messageId}
      aria-haspopup={'listbox'}
      data-native
      data-label={inputLabel}
      data-value={rawValue.join(',')}
      ref={el => refInputEl(el)}
      onChange={ev => onChange(ev)}
      onFocus={ev => onFocus(ev)}
      onBlur={ev => onBlur(ev)}
      onKeyDown={ev => onKeyDown(ev)}
      {...inheritedAttributes}
    />
  )

  if (httpFormSubmit) {
    return <Input />
  }

  return (
    <form novalidate>
      <Input />
    </form>
  )
}
