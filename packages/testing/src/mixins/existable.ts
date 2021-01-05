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

export const ExistableMixin: Mixin = ({ selector, creator }) => ({
  assertExists: () => {
    cy.get(selector).should('exist')
    return creator()
  },
  assertNotExists: () => {
    cy.get(selector).should('not.exist')
    return creator()
  },
})
