import type { ComponentInterface } from '@stencil/core'
import { BalSwipeSubject } from './swipe.subject'
import { BalSwipeObserver } from './swipe.interfaces'

export function ListenToSwipe(options: { mobileOnly: boolean } = { mobileOnly: false }) {
  return function (
    target: ComponentInterface & BalSwipeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, componentDidLoad, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this._balSwipeSubject) {
        this._balSwipeSubject = new BalSwipeSubject(options)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      this._balSwipeSubject.attach(this)
      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      this._balSwipeSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
