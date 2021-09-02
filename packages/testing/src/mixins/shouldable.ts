/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Shouldable<T> {
  /**
   * Creates an assertion.
   * Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)
   */
  should(chainers: string, attribute?: string, content?: string): T
}

export const ShouldableMixin: Mixin = ({ element, creator }) => ({
  should: function (chainers: string, attribute?: string, content?: string) {
    switch (arguments.length) {
      case 2:
        element().should(chainers, attribute)
        break
      case 3:
        element().should(chainers, attribute, content)
        break
      default:
        element().should(chainers)
        break
    }
    return creator()
  },
})
