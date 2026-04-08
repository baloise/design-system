import { ComponentInterface } from '@stencil/core'
import { SwipeSubject } from './swipe.subject'
import { SwipeObserver } from './swipe.interfaces'

export function ListenToSwipe(options: { mobileOnly: boolean } = { mobileOnly: false }) {
  return function (
    target: ComponentInterface & BalSwipeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_balSwipeSubject']) {
        this['_balSwipeSubject'] = new SwipeSubject(options)
        this['_balSwipeSubject'].attach(this)
      }
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_balSwipeSubject']) {
        this['_balSwipeSubject'].detach()
        this['_balSwipeSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
