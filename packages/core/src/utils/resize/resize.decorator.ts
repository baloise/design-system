import { ComponentInterface } from '@stencil/core'
import { ResizeSubject } from './resize.subject'
import { ResizeObserver } from './resize.interfaces'

export function ListenToResize() {
  return function (target: ComponentInterface & ResizeObserver, _propertyKey: string, _descriptor: PropertyDescriptor) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      if (!this['_dsResizeSubject']) {
        this['_dsResizeSubject'] = new ResizeSubject()
        this['_dsResizeSubject'].attach(this)
      }

      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      if (this['_dsResizeSubject']) {
        this['_dsResizeSubject'].detach()
        this['_dsResizeSubject'] = undefined
      }

      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
