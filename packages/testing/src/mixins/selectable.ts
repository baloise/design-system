/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Selectable<T> {
  /**
   * Selects the option at the given index or indexes
   */
  select(indexes: number[] | number | string): T
  /**
   * Asserts that the option with the given index is selected
   */
  assertIsSelected(indexes: number[] | number | string): T
}

export const SelectableMixin: Mixin = ({ selector, creator }) => ({
  select: (index: number) => {
    cy.get(selector).eq(index)
    return creator()
  },
  assertIsSelected: (index: number) => {
    cy.get(selector).eq(index)
    return creator()
  },
})
