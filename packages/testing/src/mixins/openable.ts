/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Openable<T> {
  /**
   * Verifies if the component is open
   */
  assertIsOpen(): T
  /**
   * Verifies if the component is closed
   */
  assertIsClosed(): T
}

export const OpenableMixin: Mixin = ({ element, creator }) => ({
  assertIsOpen: () => {
    element().should('have.attr', 'is-active')
    return creator()
  },
  assertIsClosed: () => {
    element().should('not.have.attr', 'is-active')
    return creator()
  },
})
