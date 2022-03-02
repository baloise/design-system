import { EventEmitter } from '@stencil/core'

export interface FormInput<Value> {
  el: HTMLElement
  disabled: boolean
  hasFocus: boolean
  value?: Value
  inputValue?: Value
  nativeInput?: HTMLInputElement
  balClick: EventEmitter<MouseEvent>
  balFocus: EventEmitter<FocusEvent>
  balBlur: EventEmitter<FocusEvent>
  balInput: EventEmitter<Value>
  balChange: EventEmitter<Value>
}

export const stopEventBubbling = (event: Event): void => {
  event.preventDefault()
  event.stopPropagation()
}

export const getInputTarget = (event: Event): HTMLInputElement | null => {
  return event.target as HTMLInputElement | null
}

export const getNativeInputValue = <Value>(component: FormInput<Value>): string => {
  return component.nativeInput?.value || ''
}

export const getUpcomingValue = <Value>(component: FormInput<Value>, event: KeyboardEvent) => {
  const value = component.nativeInput?.value || ''
  const idx = (event as any).target?.selectionStart
  return value.slice(0, idx) + event.key + value.slice(idx + Math.abs(0))
}

export const inputSetBlur = <Value>(component: FormInput<Value>): void => {
  if (component.nativeInput) {
    component.nativeInput.blur()
  }
}

export const inputListenOnClick = <Value>(component: FormInput<Value>, event: UIEvent): void => {
  if (component.disabled && event.target && event.target === component.el) {
    stopEventBubbling(event)
  }
}

export const inputSetFocus = <Value>(component: FormInput<Value>): void => {
  if (component.nativeInput) {
    component.nativeInput.focus()
  }
}

export const inputHandleHostClick = <Value>(component: FormInput<Value>, event: MouseEvent) => {
  if (component.disabled) {
    stopEventBubbling(event)
  }
}

export const inputHandleClick = <Value>(component: FormInput<Value>, event: MouseEvent) => {
  if (!component.disabled) {
    component.balClick.emit(event)
  }
}

export const inputHandleFocus = <Value>(component: FormInput<Value>, event: FocusEvent) => {
  component.hasFocus = true
  component.inputValue = component.value
  component.balFocus.emit(event)
}

export const inputHandleBlur = <Value>(component: FormInput<Value>, event: FocusEvent) => {
  component.hasFocus = false
  component.balBlur.emit(event)
}

export const inputHandleChange = <Value>(component: FormInput<Value>) => {
  if (component.value !== component.inputValue) {
    component.value = component.inputValue
    component.balChange.emit(component.value)
  }
}
