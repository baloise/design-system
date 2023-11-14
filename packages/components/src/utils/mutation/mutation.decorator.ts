import type { ComponentInterface } from '@stencil/core'
import { BalMutationObserver, MutationObserverOptions } from './mutation.interfaces'
import { BalMutationSubject } from './mutation.subject'

export function ListenToMutation(options: Partial<MutationObserverOptions>) {
  return function (
    target: ComponentInterface & BalMutationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      this._balMutationSubject = new BalMutationSubject(options)
      this._balMutationSubject.attach(this)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      this._balMutationSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
