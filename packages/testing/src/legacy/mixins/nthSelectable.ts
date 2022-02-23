/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface NthSelectable<T> {
  /**
   * Selects the option at the given index
   */
  selectNth(index: number): T
}

export const NthSelectableMixin: Mixin = ({ selector, creator }) => ({
  selectNth: (index: number) => {
    cy.get(selector).eq(index)
    return creator()
  },
})
