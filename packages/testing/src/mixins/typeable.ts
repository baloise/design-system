/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Typeable<T> {
  /**
   * Type into the component
   */
  type(text: string, options?: Partial<Cypress.TypeOptions>): T
}

export const TypeableMixin: Mixin = ({ element, creator }) => ({
  type: (text: string, options?: Partial<Cypress.TypeOptions>) => {
    element.type(text, options)
    return creator()
  },
})
