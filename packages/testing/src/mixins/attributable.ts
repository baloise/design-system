/// <reference types="cypress" />

import {Mixin} from './mixins'

export interface Attributable<T> {
  /**
   * Asserting that the element has the attribute and the value.
   */
  assertAttributeEquals(attribute: string, value: string): T
  /**
   * Asserting that the element has the attribute and include the value.
   */
  assertAttributeInclude(attribute: string, value: string): T
  /**
   * Asserting that the element does not have the attribute.
   */
  assertDoesNotHaveAttribute(attribute: string): T;
}

export const AttributableMixin: Mixin = ({selector, creator}) => ({
  assertAttributeEquals: (attribute: string, value: string) => {
    cy.get(selector).should('have.attr', attribute).and('eq', value)
    return creator()
  },

  assertAttributeInclude: (attribute: string, value: string) => {
    cy.get(selector).should('have.attr', attribute).and('include', value)
    return creator()
  },

  assertDoesNotHaveAttribute: (attribute: string) => {
    cy.get(selector).should('not.have.attr', attribute);
    return creator();
  },
})
