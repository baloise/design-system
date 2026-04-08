import { ComponentInterface } from '@stencil/core'
import { ElementStateObserver } from './element-states.interfaces'
import { ElementStateSubject } from './element-states.subject'

export function ListenToElementStates() {
  return function (
    target: ComponentInterface & BalElementStateObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_balElementStateSubject']) {
        this['_balElementStateSubject'] = new ElementStateSubject()
        this['_balElementStateSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_balElementStateSubject']) {
        this['_balElementStateSubject'].detach()
        this['_balElementStateSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
