/// <reference types="cypress" />

import {Mixin} from './mixins'

export interface Existable<T> {
  /**
   * Asserts that the element exists/not exists in the DOM
   */
  assertExists(exists?: boolean): T;
}

export const ExistableMixin: Mixin = ({selector, creator}) => ({
  assertExists: (exists = true) => {
    cy.get(selector).should(exists ? 'exist' : 'not.exist');
    return creator();
  },
})
