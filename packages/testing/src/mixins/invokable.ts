/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Invokable<T> {
  /**
   * Invoke a function on the previously yielded subject.
   */
  invoke(locator: string): T
}

export const InvokableMixin: Mixin = ({ element }) => ({
  invoke: (locator: string) => {
    return element().invoke(locator)
  },
})
