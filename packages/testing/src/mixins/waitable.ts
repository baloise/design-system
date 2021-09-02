/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Waitable<T> {
  /**
   * Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command.
   */
  wait(alias: number | string | string[], options?: any): T
}

export const WaitableMixin: Mixin = ({ element, creator }) => ({
  wait: (alias: any, options?: any) => {
    element().wait(alias, options)
    return creator()
  },
})
