/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Attributable<T> {
  assertAttributeEquals(attribute: string, value: string): T

  assertAttributeInclude(attribute: string, value: string): T

  assertDoesNotHaveAttribute(attribute: string): T
}

export const AttributableMixin: Mixin = ({ element, creator }) => ({
  assertAttributeEquals: (attribute: string, value: string) => {
    element.should('have.attr', attribute).and('eq', value)
    return creator()
  },
  assertAttributeInclude: (attribute: string, value: string) => {
    element.should('have.attr', attribute).and('include', value)
    return creator()
  },
  assertDoesNotHaveAttribute: (attribute: string) => {
    element.should('not.have.attr', attribute)
    return creator()
  },
})
