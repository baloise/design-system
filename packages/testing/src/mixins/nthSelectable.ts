/// <reference types="cypress" />

import {Mixin} from './mixins'

export interface NthSelectable<T> {
  /**
   * Selects the option at the given index.
   */
  selectNth(index: number): T
  /**
   * Selects the last option.
   */
  last(): T;
  /**
   * Selects the parent option.
   */
  parent(): T;
}

export const NthSelectableMixin: Mixin = ({selector, creator}) => ({
  selectNth: (index: number) => {
    cy.get(selector).eq(index)
    return creator()
  },
  last: () => {
    cy.get(selector).last();
    return creator();
  },
  parent: () => {
    cy.get(selector).parent();
    return creator();
  },
})
