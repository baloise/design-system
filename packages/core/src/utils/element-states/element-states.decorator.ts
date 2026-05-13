import { ComponentInterface } from '@stencil/core'
import { ElementStateObserver } from './element-states.interfaces'
import { ElementStateSubject } from './element-states.subject'

export function ListenToElementStates() {
  return function (
    target: ComponentInterface & ElementStateObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsElementStateSubject']) {
        this['_dsElementStateSubject'] = new ElementStateSubject()
        this['_dsElementStateSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsElementStateSubject']) {
        this['_dsElementStateSubject'].detach()
        this['_dsElementStateSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
