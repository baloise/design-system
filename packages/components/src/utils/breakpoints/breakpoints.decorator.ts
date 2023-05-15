import { ComponentInterface } from '@stencil/core'
import { balBreakpointSubject } from './breakpoints.subject'
import { BalBreakpointObserver } from './breakpoints.interfaces'

export function ListenToBreakpoints() {
  return function (
    target: ComponentInterface & BalBreakpointObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      balBreakpointSubject.attach(this as any)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      balBreakpointSubject.detach(this as any)
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
