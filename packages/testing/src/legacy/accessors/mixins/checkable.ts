/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Checkable<T> {
  check(options?: Partial<Cypress.CheckOptions>): T

  assertIsChecked(shouldBeChecked?: boolean): T
}

export const CheckableMixin: Mixin = ({ element, creator }) => ({
  check: (options?: Partial<Cypress.CheckOptions>) => {
    element.check(options)
    return creator()
  },
  assertIsChecked: (shouldBeChecked = true) => {
    element.should(shouldBeChecked ? 'be.checked' : 'not.be.checked')
    return creator()
  },
})
