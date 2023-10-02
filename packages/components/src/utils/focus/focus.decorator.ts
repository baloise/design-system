import { ComponentInterface } from '@stencil/core'
import { BalFocusObserver } from './focus.interfaces'
import { BalFocusSubject } from './focus.subject'

export function ListenToFocus() {
  return function (
    target: ComponentInterface & BalFocusObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this._balFocusSubject) {
        this._balFocusSubject = new BalFocusSubject()
        this._balFocusSubject.attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this._balFocusSubject) {
        this._balFocusSubject.detach()
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
