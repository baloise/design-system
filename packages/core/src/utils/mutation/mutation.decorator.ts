import { ComponentInterface, transformTag } from '@stencil/core'
import { BalMutationObserver, MutationObserverOptions } from './mutation.interfaces'
import { BalMutationSubject } from './mutation.subject'

export function ListenToMutation(options: Partial<MutationObserverOptions>) {
  if (options.tags) {
    options = { ...options, tags: options.tags.map(tag => transformTag(tag)) }
  }
  return function (
    target: ComponentInterface & BalMutationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this._balMutationSubject) {
        this._balMutationSubject = new BalMutationSubject(options)
        this._balMutationSubject.attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this._balMutationSubject) {
        this._balMutationSubject.detach()
        this._balMutationSubject = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
