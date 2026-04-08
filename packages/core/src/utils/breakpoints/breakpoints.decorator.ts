import { ComponentInterface } from '@stencil/core'
import { dsBreakpointSubject } from './breakpoints.subject'
import { BreakpointObserver } from './breakpoints.interfaces'

export function ListenToBreakpoints() {
  return function (
    target: ComponentInterface & BalBreakpointObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      dsBreakpointSubject.attach(this as any)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      dsBreakpointSubject.detach(this as any)
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
