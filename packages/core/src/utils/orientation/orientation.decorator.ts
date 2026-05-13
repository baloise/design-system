import type { ComponentInterface } from '@stencil/core'
import type { DsOrientationObserver } from './orientation.interfaces'
import { dsOrientationSubject } from './orientation.subject'

export function ListenToOrientation() {
  return function (
    target: ComponentInterface & DsOrientationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      dsOrientationSubject.attach(this)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      dsOrientationSubject.detach(this)
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
