/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface NthSelectable<T> {
  /**
   * Get A DOM element at a specific index in an array of elements
   */
  eq(index: number, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): T
  /**
   * Get the first DOM element within a set of DOM elements.
   */
  first(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): T
  /**
   * Get the last DOM element within a set of DOM elements.
   */
  last(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): T
  /**
   * Get the parent DOM element of a set of DOM elements.
   */
  parent(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): T
}

export const NthSelectableMixin: Mixin = ({ element, creator }) => ({
  eq: (index: number, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) => {
    element().eq(index, options)
    return creator()
  },
  first: (options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) => {
    element().first(options)
    return creator()
  },
  last: (options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) => {
    element().last(options)
    return creator()
  },
  parent: (options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) => {
    element().parent(options)
    return creator()
  },
})
