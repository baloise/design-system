import { ComponentInterface } from '@stencil/core'
import { FocusObserver } from './focus.interfaces'
import { FocusSubject } from './focus.subject'

export function ListenToFocus() {
  return function (target: ComponentInterface & FocusObserver, _propertyKey: string, _descriptor: PropertyDescriptor) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsFocusSubject']) {
        this['_dsFocusSubject'] = new FocusSubject()
        this['_dsFocusSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsFocusSubject']) {
        this['_dsFocusSubject'].detach()
        this['_dsFocusSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
