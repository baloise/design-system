/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Visible<T> {
  /**
   * Assert that the component is visible for the user
   */
  assertVisible(): T
  /**
   * Assert that the component is not visible for the user
   */
  assertNotVisible(): T
}

export const VisibleMixin: Mixin = ({ selector, creator }) => ({
  assertVisible: () => {
    cy.get(selector).should('be.visible')
    return creator()
  },
  assertNotVisible: () => {
    cy.get(selector).should('not.be.visible')
    return creator()
  },
})
