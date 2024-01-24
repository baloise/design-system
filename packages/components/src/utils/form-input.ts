import { EventEmitter } from '@stencil/core'
import { waitAfterIdleCallback } from './helpers'

export interface FormInput<Value> {
  el: HTMLElement
  disabled: boolean
  readonly: boolean
  focused: boolean
  value?: Value
  inputValue?: Value
  nativeInput?: HTMLInputElement | HTMLTextAreaElement
  balClick?: EventEmitter<MouseEvent>
  balFocus?: EventEmitter<FocusEvent>
  balBlur?: EventEmitter<FocusEvent>
  balChange: EventEmitter<Value>
}

export const stopEventBubbling = (ev: Event): void => {
  if (ev) {
    ev.preventDefault()
    ev.stopPropagation()
  }
}

export const getInputTarget = (ev: Event): HTMLInputElement | null => {
  return ev.target as HTMLInputElement | null
}

export const getNativeInputValue = <Value>(component: FormInput<Value>): string => {
  return component.nativeInput?.value || ''
}

export const getUpcomingValue = <Value>(component: FormInput<Value>, ev: KeyboardEvent) => {
  const value = component.nativeInput?.value || ''
  const idx = (ev as any).target?.selectionStart
  return value.slice(0, idx) + ev.key + value.slice(idx + Math.abs(0))
}

export const inputSetBlur = <Value>(component: FormInput<Value>): void => {
  if (component.nativeInput) {
    component.nativeInput.blur()
  }
}

export const inputListenOnClick = <Value>(component: FormInput<Value>, ev: UIEvent): void => {
  if ((component.disabled || component.readonly) && ev.target && ev.target === component.el) {
    stopEventBubbling(ev)
  }
}

export const inputSetFocus = async <Value>(component: FormInput<Value>): Promise<void> => {
  await waitAfterIdleCallback()
  component?.nativeInput?.focus()
}

export const inputHandleHostClick = <Value>(component: FormInput<Value>, ev: MouseEvent) => {
  if (component.disabled || component.readonly) {
    stopEventBubbling(ev)
  }
}

export const inputHandleClick = <Value>(component: FormInput<Value>, ev: MouseEvent) => {
  if (!component.disabled && !component.readonly && component.balClick) {
    component.balClick.emit(ev)
  }
}

export const inputHandleFocus = <Value>(component: FormInput<Value>, ev: FocusEvent) => {
  component.focused = true
  component.inputValue = component.value
  if (!component.disabled && component.balFocus) {
    component.balFocus.emit(ev)
  }
}

export const inputHandleReset = <Value>(
  component: FormInput<Value>,
  defaultValue: Value | undefined = undefined,
  timer: NodeJS.Timeout | undefined,
) => {
  component.value = defaultValue
  component.inputValue = component.value
  clearTimeout(timer)
  timer = setTimeout(() => {
    if (component.nativeInput) {
      component.nativeInput.value = component.value as any
    }
  })
}

export const inputHandleBlur = <Value>(component: FormInput<Value>, ev: FocusEvent) => {
  component.focused = false
  if (!component.disabled && component.balBlur) {
    component.balBlur.emit(ev)
  }
}

export const inputHandleChange = <Value>(component: FormInput<Value>) => {
  if (component.value !== component.inputValue) {
    component.value = component.inputValue
    component.balChange.emit(component.value)
  }
}
