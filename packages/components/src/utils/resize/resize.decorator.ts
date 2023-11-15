import type { ComponentInterface } from '@stencil/core'
import { BalResizeSubject } from './resize.subject'
import { BalResizeObserver } from './resize.interfaces'

export function ListenToResize() {
  return function (
    target: ComponentInterface & BalResizeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { componentDidLoad, disconnectedCallback } = target

    target.componentDidLoad = function () {
      this._balResizeSubject = new BalResizeSubject()
      this._balResizeSubject.attach(this)
      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      this._balResizeSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
