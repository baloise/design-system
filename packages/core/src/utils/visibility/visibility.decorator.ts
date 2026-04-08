import { ComponentInterface } from '@stencil/core'
import { VisibilityObserver } from './visibility.interfaces'
import { VisibilitySubject } from './visibility.subject'

export function ListenToVisibility() {
  return function (
    target: ComponentInterface & BalVisibilityObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, componentDidLoad, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_balVisibilitySubject']) {
        this['_balVisibilitySubject'] = new VisibilitySubject()
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      this['_balVisibilitySubject'].attach(this)

      return componentDidLoad && componentDidLoad.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_balVisibilitySubject']) {
        this['_balVisibilitySubject'].detach()
        this['_balVisibilitySubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
