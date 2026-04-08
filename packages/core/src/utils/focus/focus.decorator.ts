import { ComponentInterface } from '@stencil/core'
import { FocusObserver } from './focus.interfaces'
import { FocusSubject } from './focus.subject'

export function ListenToFocus() {
  return function (
    target: ComponentInterface & BalFocusObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_balFocusSubject']) {
        this['_balFocusSubject'] = new FocusSubject()
        this['_balFocusSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_balFocusSubject']) {
        this['_balFocusSubject'].detach()
        this['_balFocusSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
