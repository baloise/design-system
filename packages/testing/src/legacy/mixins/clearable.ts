/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Clearable<T> {
  /**
   * Clears the value of the element
   */
  clear(options?: Partial<Cypress.TypeOptions>): T
}

export const ClearableMixin: Mixin = ({ selector, creator }) => ({
  clear: (options?: Partial<Cypress.ClearOptions>) => {
    cy.get(selector).clear(options)
    return creator()
  },
})
