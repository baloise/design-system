import { ComponentInterface } from '@stencil/core'
import { DsSwipeSubject } from './swipe.subject'
import { DsSwipeObserver } from './swipe.interfaces'

export function ListenToSwipe(options: { mobileOnly: boolean } = { mobileOnly: false }) {
  return function (
    target: ComponentInterface & DsSwipeObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsSwipeSubject']) {
        this['_dsSwipeSubject'] = new DsSwipeSubject(options)
        this['_dsSwipeSubject'].attach(this)
      }
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsSwipeSubject']) {
        this['_dsSwipeSubject'].detach()
        this['_dsSwipeSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
