import { FunctionalComponent, h } from '@stencil/core'
import { ariaBooleanToString } from '../aria'
import { Attributes } from '../attributes'
import { BEM } from '../bem'
import { BalLanguage } from '../config'
import { BalAriaForm } from '../form'
import { i18nBalDropdown } from './dropdown.i18n'
import { DropdownMode } from './mode'

export interface DropdownInputProps {
  mode: DropdownMode
  inputId: string
  httpFormSubmit: boolean
  ariaForm: BalAriaForm
  value: string
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
  refInputEl: (el: HTMLInputElement) => void
  onInput?: (ev: InputEvent) => void
  onChange: (ev: Event) => void
  onFocus: (ev: FocusEvent) => void
  onBlur: (ev: FocusEvent) => void
  onKeyDown: (ev: KeyboardEvent) => void
}

export const DropdownInput: FunctionalComponent<DropdownInputProps> = ({
  mode,
  inputId,
  httpFormSubmit,
  ariaForm,
  value,
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
  onInput,
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
        ...block
          .element('root')
          .element('input')
          .modifier('typeahead')
          .class(mode === DropdownMode.Typeahead),
      }}
      {...(mode === DropdownMode.Typeahead
        ? {
            style: {
              'min-width': placeholder ? `${placeholder.length}ch` : '4rem',
            },
          }
        : {})}
      type="text"
      size={1}
      inputmode="none"
      tabindex="0"
      autoComplete={autocomplete}
      value={value}
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
      data-value={value}
      ref={el => (el ? refInputEl(el) : void 0)}
      {...(onInput ? { onInput: ev => onInput(ev) } : {})}
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
