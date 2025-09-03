/* eslint-disable */
/* tslint:disable */
import { EventEmitter } from '@angular/core'

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item]
      },
      set(val: any) {
        /**
         * This is a workaround to ensure that the value is set
         * outside of Angular's zone, preventing unnecessary change
         * detection cycles.
         */
        this.z.runOutsideAngular(() => {
          this.el[item] = val
          /**
           * To ensure the value is properly set to the web component in
           * a ng-if context we need to set it directly and after an event loop tick.
           */
          setTimeout(() => {
            this.el[item] = val
          }, 0)
        })
      },
      /**
       * In the event that proxyInputs is called
       * multiple times re-defining these inputs
       * will cause an error to be thrown. As a result
       * we set configurable: true to indicate these
       * properties can be changed.
       */
      configurable: true,
    })
  })
}

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype
  methods.forEach(methodName => {
    Prototype[methodName] = function () {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments
      // eslint-disable-next-line prefer-spread
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args))
    }
  })
}

export const proxyOutputs = (instance: any, _el: any, events: string[]) => {
  events.forEach(eventName => (instance[eventName] = new EventEmitter()))
}

export const defineCustomElement = (tagName: string, customElement: any) => {
  if (customElement !== undefined && typeof customElements !== 'undefined' && !customElements.get(tagName)) {
    customElements.define(tagName, customElement)
  }
}

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { defineCustomElementFn?: () => void; inputs?: any; methods?: any }) {
  const decorator = function (cls: any) {
    const { defineCustomElementFn, inputs, methods } = opts

    if (defineCustomElementFn !== undefined) {
      defineCustomElementFn()
    }

    if (inputs) {
      proxyInputs(cls, inputs)
    }
    if (methods) {
      proxyMethods(cls, methods)
    }
    return cls
  }
  return decorator
}
