/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Containable<T> {
  /**
   * Verifies if the content of the element matches
   */
  contains(content: string | number | RegExp): T
}

export const ContainableMixin: Mixin = ({ selector, creator }) => ({
  contains: (content: string | number | RegExp) => {
    cy.get(selector).contains(content)
    return creator()
  },
})
