import type { ComponentInterface } from '@stencil/core'
import { BalKeyboardObserver } from './keyboard.interfaces'
import { BalKeyboardSubject } from './keyboard.subject'

export function ListenToKeyboard() {
  return function (
    target: ComponentInterface & BalKeyboardObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { componentDidLoad, disconnectedCallback } = target

    target.componentDidLoad = function () {
      this._balKeyboardSubject = new BalKeyboardSubject()
      this._balKeyboardSubject.attach(this)
      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      this._balKeyboardSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
