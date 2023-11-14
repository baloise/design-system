import type { ComponentInterface } from '@stencil/core'
import { balOrientationSubject } from './orientation.subject'
import { BalOrientationObserver } from './orientation.interfaces'

export function ListenToOrientation() {
  return function (
    target: ComponentInterface & BalOrientationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      balOrientationSubject.attach(this)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      balOrientationSubject.detach(this)
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
