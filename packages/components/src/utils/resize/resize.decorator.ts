import { ComponentInterface } from '@stencil/core'
import { BalResizeSubject } from './resize.subject'
import { BalResizeObserver } from './resize.interfaces'

export function ListenToResize() {
  return function (
    target: ComponentInterface & BalResizeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      this._balResizeSubject = new BalResizeSubject()
      this._balResizeSubject.attach(this)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      this._balResizeSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
