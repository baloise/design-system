import { ComponentInterface } from '@stencil/core'
import { addEventListener, removeEventListener } from './helpers'
import { balBrowser } from './browser'

export interface ListenOptions {
  target?: ListenTargetOptions
  capture?: boolean
  passive?: boolean
}

export type ListenTargetOptions = 'document' | 'window'

/**
 * This decorator replaces the @Listen from stencil since
 * they have issue with connecting and disconnecting web-components.
 */
export function ListenTo(eventName: string, opts: ListenOptions = {}) {
  return function (target: ComponentInterface, propertyKey: string, _descriptor: PropertyDescriptor) {
    const { connectedCallback, disconnectedCallback } = target
    const { capture, passive } = opts
    const options = { capture, passive }
    const callback = target[propertyKey]

    /**
     * Define const keys for binding the target
     * and callback to the web component
     */
    const boundPropertyKey = `__${propertyKey}Bound`
    const boundEL = `__elBound`

    target.connectedCallback = function () {
      connectedCallback && connectedCallback.call(this)

      if (this.el) {
        /**
         * Bind target element to the web component so we can
         * add and remove the event listener
         */
        if (opts.target === 'document' && balBrowser.hasDocument) {
          this[boundEL] = document
        } else if (opts.target === 'window' && balBrowser.hasWindow) {
          this[boundEL] = window
        } else {
          this[boundEL] = this.el
        }
        /**
         * Bind event listener callback function to the web component
         * so we can add and remove the event listener
         */
        this[boundPropertyKey] = callback.bind(this)
        /**
         * Add event listener
         */
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
