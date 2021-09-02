/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Childable<T> {
  /**
   * Get the children of each DOM element within a set of DOM elements.
   */
  children(selector?: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): T
}

export const ChildableMixin: Mixin = ({ element, creator }) => ({
  children: (selector?: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) => {
    element().children(selector, options)
    return creator()
  },
})
