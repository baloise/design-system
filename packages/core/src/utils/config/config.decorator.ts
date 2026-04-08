import { ComponentInterface } from '@stencil/core'
import { DsConfigObserver, attachComponentToConfig, detachComponentFromConfig } from '.'

export function ListenToConfig() {
  return function (
    target: ComponentInterface & DsConfigObserver,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    const { connectedCallback, disconnectedCallback } = target

    target.connectedCallback = function () {
      attachComponentToConfig(this)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      detachComponentFromConfig(this)
      return disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}
