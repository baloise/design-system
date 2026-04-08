import { ComponentInterface } from '@stencil/core'
import { VisibilityObserver } from './visibility.interfaces'
import { VisibilitySubject } from './visibility.subject'

export function ListenToVisibility() {
  return function (
    target: ComponentInterface & VisibilityObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, componentDidLoad, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsVisibilitySubject']) {
        this['_dsVisibilitySubject'] = new VisibilitySubject()
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      this['_dsVisibilitySubject'].attach(this)

      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsVisibilitySubject']) {
        this['_dsVisibilitySubject'].detach()
        this['_dsVisibilitySubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
