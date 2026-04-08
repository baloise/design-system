import { ComponentInterface } from '@stencil/core'
import { KeyboardObserver } from './keyboard.interfaces'
import { KeyboardSubject } from './keyboard.subject'

export function ListenToKeyboard() {
  return function (
    target: ComponentInterface & KeyboardObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsKeyboardSubject']) {
        this['_dsKeyboardSubject'] = new KeyboardSubject()
        this['_dsKeyboardSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsKeyboardSubject']) {
        this['_dsKeyboardSubject'].detach()
        this['_dsKeyboardSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
