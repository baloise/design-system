import { h, Host, FunctionalComponent } from '@stencil/core'
import { ariaBooleanToString } from '../../utils/aria'
import { I18nDsLabel } from '../label/label.i18n'
import { DsLanguage } from '../../utils/config'

export type FieldInterface = {
  color: DS.InputColor
  disabled: boolean | undefined
  invalid: boolean | undefined
  loading?: boolean
  label?: string
  description?: string
  invalidText?: string
  required: boolean
  language: DsLanguage
  inputId?: string
  cssClasses?: Record<string, boolean>
  onClick?: (ev: MouseEvent) => void
}

export type FieldProps = FieldInterface & {
  role?: 'fieldset' | 'field'
}

export const Field: FunctionalComponent<FieldProps> = (props, children) => {
  const inputId = props.inputId ?? 'input'
  const role = props.role === 'fieldset' ? 'group' : undefined
  return (
    <Host
      role={role}
      aria-disabled={ariaBooleanToString(props.disabled)}
      aria-invalid={ariaBooleanToString(props.invalid)}
      aria-describedby="description"
      class={{
        'ds-field ': true,
        'is-disabled': !!props.disabled,
        'is-danger': props.color === 'danger' || !!props.invalid,
        'is-success': props.color === 'success' && !props.invalid,
        'is-warning': props.color === 'warning' && !props.invalid,
        ...props.cssClasses,
      }}
      onClick={(ev: MouseEvent) => props.onClick?.(ev)}
    >
      {/* ---------------------------------------- */}
      {/* Label                                    */}
      {/* ---------------------------------------- */}
      {props.label &&
        (props.role === 'fieldset' ? (
          <legend part="label" id="label">
            <slot name="label">{props.label}</slot>
            {!props.required && <span>{I18nDsLabel[props.language].optional || ''}</span>}
          </legend>
        ) : (
          <label htmlFor={inputId} part="label" id="label">
            <slot name="label">{props.label}</slot>
            {!props.required && <span>{I18nDsLabel[props.language].optional || ''}</span>}
          </label>
        ))}
      {/* ---------------------------------------- */}
      {/* Input Control                            */}
      {/* ---------------------------------------- */}
      <div id="container" part="control">
        <slot name="start"></slot>
        {children}
        <slot name="end"></slot>
        {/* ---------------------------------------- */}
        {/* Loading Indicator                        */}
        {/* ---------------------------------------- */}
        {props.loading === true && (
          <ds-spinner small variation="circle" color={props.disabled ? 'white' : 'blue'}></ds-spinner>
        )}
      </div>
      {/* ---------------------------------------- */}
      {/* Description                              */}
      {/* ---------------------------------------- */}
      {props.label && (
        <span id="description" part="description" role={props.invalid && props.invalidText ? 'alert' : undefined}>
          {props.invalid && props.invalidText && <ds-icon name="alert"></ds-icon>}
          <slot name="description">{props.invalid && props.invalidText ? props.invalidText : props.description}</slot>
        </span>
      )}
    </Host>
  )
}
