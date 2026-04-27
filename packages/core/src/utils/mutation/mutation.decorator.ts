import { ComponentInterface } from '@stencil/core'
import { MutationObserver, MutationObserverOptions } from './mutation.interfaces'
import { MutationSubject } from './mutation.subject'

export function ListenToMutation(options: Partial<MutationObserverOptions>) {
  return function (
    target: ComponentInterface & MutationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsMutationSubject']) {
        this['_dsMutationSubject'] = new MutationSubject(options)
        this['_dsMutationSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsMutationSubject']) {
        this['_dsMutationSubject'].detach()
        this['_dsMutationSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
