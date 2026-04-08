import { ComponentInterface } from '@stencil/core'
import { KeyboardObserver } from './keyboard.interfaces'
import { KeyboardSubject } from './keyboard.subject'

export function ListenToKeyboard() {
  return function (
    target: ComponentInterface & BalKeyboardObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_balKeyboardSubject']) {
        this['_balKeyboardSubject'] = new KeyboardSubject()
        this['_balKeyboardSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_balKeyboardSubject']) {
        this['_balKeyboardSubject'].detach()
        this['_balKeyboardSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
