import { ComponentInterface } from '@stencil/core'
import { WindowResizeObserver } from './window-resize.interfaces'
import { WindowResizeSubject } from './window-resize.subject'

export function ListenToWindowResize() {
  return function (
    target: ComponentInterface & WindowResizeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsWindowResizeSubject']) {
        this['_dsWindowResizeSubject'] = new WindowResizeSubject()
        this['_dsWindowResizeSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsWindowResizeSubject']) {
        this['_dsWindowResizeSubject'].detach()
        this['_dsWindowResizeSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
