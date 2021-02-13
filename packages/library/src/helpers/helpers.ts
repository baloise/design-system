import { EventEmitter } from '@stencil/core'

export const debounceEvent = (event: EventEmitter, wait: number): EventEmitter => {
  const original = (event as any)._original || event
  return {
    _original: event,
    emit: debounce(original.emit.bind(original), wait),
  } as EventEmitter
}

export const debounce = (func: (...args: any[]) => void, wait = 0) => {
  let timer: any
  return (...args: any[]): any => {
    clearTimeout(timer)
    timer = setTimeout(func, wait, ...args)
  }
}

export const findItemLabel = (componentEl: HTMLElement): HTMLLabelElement | null => {
  const fieldLabelEl = componentEl.closest('bal-field')
  if (fieldLabelEl) {
    return fieldLabelEl.querySelector('label')
  }
  return null
}
