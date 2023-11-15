import type { ComponentInterface } from '@stencil/core'
import { BalFocusObserver } from './focus.interfaces'
import { BalFocusSubject } from './focus.subject'

export function ListenToFocus() {
  return function (
    target: ComponentInterface & BalFocusObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, componentDidLoad, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this._balFocusSubject) {
        this._balFocusSubject = new BalFocusSubject()
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      this._balFocusSubject.attach(this)

      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      if (this._balFocusSubject) {
        this._balFocusSubject.detach()
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
