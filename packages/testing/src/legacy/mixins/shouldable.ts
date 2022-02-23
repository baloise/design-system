/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Shouldable<T> {
  /**
   * Creates an assertion.
   * Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)
   */
  should(chainers: string, attribute?: string, content?: string): T
}

export const ShouldableMixin: Mixin = ({ selector, creator }) => ({
  should: function (chainers: string, attribute?: string, content?: string) {
    switch (arguments.length) {
      case 2:
        cy.get(selector).should(chainers, attribute)
        break
      case 3:
        cy.get(selector).should(chainers, attribute, content)
        break
      default:
        cy.get(selector).should(chainers)
        break
    }
    return creator()
  },
})
