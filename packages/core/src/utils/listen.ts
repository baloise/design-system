import { ComponentInterface } from '@stencil/core'
import { addEventListener, removeEventListener } from './helpers'
import { balBrowser } from './browser'

export interface ListenOptions {
  target?: ListenTargetOptions
  capture?: boolean
  passive?: boolean
}

export type ListenTargetOptions = 'document' | 'window'

export function ListenTo(eventName: string, opts: ListenOptions = {}) {
  return function (target: ComponentInterface, propertyKey: string, _descriptor: PropertyDescriptor) {
    const { connectedCallback, disconnectedCallback } = target
    const { capture, passive } = opts

    const callback = target[propertyKey]
    const boundPropertyKey = `__${propertyKey}Bound`
    const boundEL = `__elBound`
    const options = { capture, passive }

    target.connectedCallback = function () {
      connectedCallback && connectedCallback.call(this)

      if (this.el) {
        this[boundEL] = this.el
        if (balBrowser.hasDocument && opts.target === 'document') {
          this[boundEL] = document
        }
        if (balBrowser.hasWindow && opts.target === 'window') {
          this[boundEL] = window
        }

        this[boundPropertyKey] = callback.bind(this)
        if (this[boundEL] && callback) {
          addEventListener(this[boundEL], eventName, this[boundPropertyKey], options)
        }
      }
    }

    target.disconnectedCallback = function () {
      disconnectedCallback && disconnectedCallback.call(this)

      if (this[boundEL] && callback) {
        removeEventListener(this[boundEL], eventName, this[boundPropertyKey], options)
      }
    }
  }
}
