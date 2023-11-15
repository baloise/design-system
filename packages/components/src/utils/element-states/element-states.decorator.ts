import type { ComponentInterface } from '@stencil/core'
import { BalElementStateSubject } from './element-states.subject'
import { BalElementStateObserver } from './element-states.interfaces'

export function ListenToElementStates() {
  return function (
    target: ComponentInterface & BalElementStateObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, componentDidLoad, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this._balElementStateSubject) {
        this._balElementStateSubject = new BalElementStateSubject()
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      this._balElementStateSubject.attach(this)
      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      this._balElementStateSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
