import { ComponentInterface } from '@stencil/core'
import { BalAnimationObserver } from './animation.interfaces'
import { BalAnimationSubject } from './animation.subject'

export function ListenToAnimation() {
  return function (
    target: ComponentInterface & BalAnimationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, componentDidLoad, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this._balAnimationSubject) {
        this._balAnimationSubject = new BalAnimationSubject()
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      this._balAnimationSubject.attach(this)

      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      if (this._balAnimationSubject) {
        this._balAnimationSubject.detach()
        this._balAnimationSubject = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
