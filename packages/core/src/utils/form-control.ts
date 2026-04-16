import { EventEmitter } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { waitAfterIdleCallback } from './helpers'

/**
 * FORM CONTROL
 * ------------------------------------------------------
 */

export interface FormControlInterface<Value extends NonNullable<unknown> | null = string | null, ReturnValue = Value> {
  el: HTMLStencilElement
  internals: ElementInternals
  // nativeInput?: HTMLInputElement | HTMLTextAreaElement
  // initialValue?: Value
  // inputValue?: Value
  // Properties
  disabled: boolean
  readonly: boolean
  focused: boolean
  value: Value
  // Events
  dsClick: EventEmitter<MouseEvent>
  dsFocus: EventEmitter<FocusEvent>
  dsBlur: EventEmitter<FocusEvent>
  dsInput: EventEmitter<ReturnValue>
  dsChange: EventEmitter<ReturnValue>
}

type ControlValue = File | string | FormData | null

export class FormControl<Value extends NonNullable<unknown> | null = string | null, ReturnValue = Value> {
  private resetHandlerTimer?: NodeJS.Timeout

  initialValue: Value = null as Value
  inputValue: Value = null as Value

  nativeEl?: HTMLInputElement | HTMLTextAreaElement

  constructor(private component: FormControlInterface<Value>) {}

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  listenOnClick = (ev: UIEvent): void => {
    if ((this.component.disabled || this.component.readonly) && ev.target && ev.target === this.component.el) {
      stopEventBubbling(ev)
    }
  }

  listenOnReset = (ev: UIEvent): void => {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.component.el)) {
      this.setValue(this.initialValue)

      clearTimeout(this.resetHandlerTimer)

      this.resetHandlerTimer = setTimeout(() => {
        if (this.nativeEl) {
          this.nativeEl.value = this.component.value as any
        }
      })
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.initialValue = this.component.value
  }

  componentDidLoad() {
    this.inputValue = this.component.value
    this.component.internals.setFormValue(this.inputValue as ControlValue)
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  onClick = (ev: MouseEvent) => {
    if (!this.component.disabled && !this.component.readonly) {
      this.component?.dsClick.emit(ev)
    }
  }

  onFocus = (ev: FocusEvent) => {
    this.component.focused = true
    this.inputValue = this.component.value
    if (!this.component.disabled) {
      this.component?.dsFocus.emit(ev)
    }
  }

  onBlur = (ev: FocusEvent) => {
    this.component.focused = false
    if (!this.component.disabled) {
      this.component?.dsBlur.emit(ev)
      this.setValue(this.inputValue)
    }
  }

  onInput = (ev: InputEvent) => {
    this.inputValue = (this.nativeEl?.value || null) as Value
    this.component.dsInput.emit(this.inputValue || undefined)
  }

  /**
   * METHODS
   * ------------------------------------------------------
   */

  setValue = (newValue: Value) => {
    if (hasValueChanged(this.component.value, newValue)) {
      this.component.value = newValue
      this.inputValue = newValue
      this.component.internals.setFormValue(this.inputValue as ControlValue)
      this.component.dsChange.emit(this.component.value)
    }
  }

  setBlur = async (): Promise<void> => {
    this?.nativeEl?.blur()
  }

  setFocus = async (): Promise<void> => {
    await waitAfterIdleCallback()
    this?.nativeEl?.focus()
  }
}

/**
 * HELPER FUNCTIONS
 * ------------------------------------------------------
 */

// export const getUpcomingValue = <Value>(component: FormControlInterface<Value>, ev: KeyboardEvent) => {
//   const value = component.nativeInput?.value || ''
//   const idx = (ev as any).target?.selectionStart
//   return value.slice(0, idx) + ev.key + value.slice(idx + Math.abs(0))
// }

export const getControlTarget = (ev: Event): HTMLInputElement | null => {
  return ev.target as HTMLInputElement | null
}

// export const getNativeControlValue = <Value>(component: FormControlInterface<Value>): string => {
//   return component.nativeInput?.value || ''
// }

export const isEmptyValue = (value: any): boolean => {
  return (
    value === '' ||
    value === undefined ||
    value === null ||
    (Array.isArray(value) && !value.length) ||
    (typeof value === 'number' && isNaN(value))
  )
}

export const parseValue = <Value>(value: Value): Value | undefined => {
  return isEmptyValue(value) ? undefined : value
}

export const hasValueChanged = (oldValue: any, newValue: any): boolean => {
  return parseValue(oldValue) !== parseValue(newValue)
}

export const stopEventBubbling = (ev: Event): void => {
  if (ev) {
    ev.preventDefault()
    ev.stopPropagation()
  }
}
