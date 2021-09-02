/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Eachable<T> {
  /**
   * Iterate through an array like structure.
   */
  each(fn: (item: any, index: number, $list: any[]) => void): T
}

export const EachableMixin: Mixin = ({ element, creator }) => ({
  each: (fn: (item: any, index: number, $list: any[]) => void) => {
    element().each((item, index, list) => {
      fn(item, index, list)
    })
    cy.wrap
    return creator()
  },
})
