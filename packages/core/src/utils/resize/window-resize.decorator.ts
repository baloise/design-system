import { ComponentInterface } from '@stencil/core'
import { BalWindowResizeObserver } from './window-resize.interfaces'
import { BalWindowResizeSubject } from './window-resize.subject'

export function ListenToWindowResize() {
  return function (
    target: ComponentInterface & BalWindowResizeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this._balWindowResizeSubject) {
        this._balWindowResizeSubject = new BalWindowResizeSubject()
        this._balWindowResizeSubject.attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this._balWindowResizeSubject) {
        this._balWindowResizeSubject.detach()
        this._balWindowResizeSubject = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
