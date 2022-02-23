/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Blurable<T> {
  /**
   * Lose focus of this element
   */
  blur(options?: Partial<Cypress.BlurOptions>): T
}

export const BlurableMixin: Mixin = ({ selector, creator }) => ({
  blur: (options?: Partial<Cypress.BlurOptions>) => {
    cy.get(selector).blur(options)
    return creator()
  },
})
