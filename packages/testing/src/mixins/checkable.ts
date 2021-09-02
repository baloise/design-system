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

export const CheckableMixin: Mixin = ({ element, creator }) => ({
  check: (options?: Partial<Cypress.CheckOptions>) => {
    element().check(options)
    return creator()
  },
  assertIsChecked: (shouldBeChecked = true) => {
    element().should(shouldBeChecked ? 'be.checked' : 'not.be.checked')
    return creator()
  },
})
