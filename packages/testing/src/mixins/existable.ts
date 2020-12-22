/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Existable<T> {
  /**
   * Asserts that the element exists in the DOM
   */
  assertExists(): T
  /**
   * Asserts that the element does not exist in the DOM
   */
  assertNotExists(): T
}

export const ExistableMixin: Mixin = ({ element, creator }) => ({
  assertExists: () => {
    element.should('exist')
    return creator()
  },
  assertNotExists: () => {
    element.should('not.exist')
    return creator()
  },
})
