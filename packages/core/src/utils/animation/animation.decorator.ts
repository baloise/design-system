import { ComponentInterface } from '@stencil/core'
import { AnimationObserver } from './animation.interfaces'
import { AnimationSubject } from './animation.subject'

export function ListenToAnimation() {
  return function (
    target: ComponentInterface & AnimationObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, componentDidLoad, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsAnimationSubject']) {
        this['_dsAnimationSubject'] = new AnimationSubject()
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      this['_dsAnimationSubject'].attach(this)

      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsAnimationSubject']) {
        this['_dsAnimationSubject'].detach()
        this['_dsAnimationSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
