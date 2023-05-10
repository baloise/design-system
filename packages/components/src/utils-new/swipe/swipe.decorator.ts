import { ComponentInterface } from '@stencil/core'
import { BalSwipeSubject } from './swipe.subject'
import { BalSwipeObserver } from './swipe.interfaces'

export function ListenToSwipe() {
  return function (
    target: ComponentInterface & BalSwipeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      this.balSwipeSubject = new BalSwipeSubject()
      this.balSwipeSubject.attach(this)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      this.balSwipeSubject.detach()
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
