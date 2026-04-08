import { ComponentInterface } from '@stencil/core'
import { MutationObserver, MutationObserverOptions } from './mutation.interfaces'
import { MutationSubject } from './mutation.subject'

export function ListenToMutation(options: Partial<MutationObserverOptions>) {
  return function (
    target: ComponentInterface & BalMutationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_balMutationSubject']) {
        this['_balMutationSubject'] = new MutationSubject(options)
        this['_balMutationSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_balMutationSubject']) {
        this['_balMutationSubject'].detach()
        this['_balMutationSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
