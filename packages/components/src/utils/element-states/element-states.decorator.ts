import { ComponentInterface } from '@stencil/core'
import { BalElementStateSubject } from './element-states.subject'
import { BalElementStateObserver } from './element-states.interfaces'

export function ListenToElementStates() {
  return function (
    target: ComponentInterface & BalElementStateObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      this.balElementStateSubject = new BalElementStateSubject()
      this.balElementStateSubject.attach(this)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      this.balElementStateSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
