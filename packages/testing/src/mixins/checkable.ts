/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Checkable<T> {
  /**
   * Check element
   */
  check(options?: Partial<Cypress.CheckOptions>): T
  /**
   * Assert if the the element is checked
   */
  assertIsChecked(shouldBeChecked?: boolean): T
}

export const CheckableMixin: Mixin = ({ selector, creator }) => ({
  check: (options?: Partial<Cypress.CheckOptions>) => {
    cy.get(selector).check(options)
    return creator()
  },
  assertIsChecked: (shouldBeChecked = true) => {
    cy.get(selector).should(shouldBeChecked ? 'be.checked' : 'not.be.checked')
    return creator()
  },
})
