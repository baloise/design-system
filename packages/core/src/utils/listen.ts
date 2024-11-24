import { ComponentInterface } from '@stencil/core'
import { addEventListener, removeEventListener } from './helpers'
import { balBrowser } from './browser'

export interface ListenOptions {
  target?: ListenTargetOptions
  capture?: boolean
  passive?: boolean
}

export type ListenTargetOptions = 'document' | 'window'

export function ListenTo(eventName: string, opts?: ListenOptions) {
  return function (target: ComponentInterface, propertyKey: string, _descriptor: PropertyDescriptor) {
    const { connectedCallback, disconnectedCallback } = target
    const { capture, passive } = opts

    let el = target.el
    if (balBrowser.hasDocument && opts.target === 'document') {
      el = document
    }
    if (balBrowser.hasWindow && opts.target === 'window') {
      el = window
    }

    const callback = target[propertyKey]
    const boundPropertyKey = `__${propertyKey}Bound`
    const options = { capture, passive }

    target.connectedCallback = function () {
      connectedCallback && connectedCallback.call(this)

      target[boundPropertyKey] = callback.bind(this)
      if (el && callback) {
        addEventListener(el, eventName, target[boundPropertyKey], options)
      }
    }

    target.disconnectedCallback = function () {
      disconnectedCallback && disconnectedCallback.call(this)

      if (el && callback) {
        removeEventListener(el, eventName, target[boundPropertyKey], options)
      }
    }
  }
}
