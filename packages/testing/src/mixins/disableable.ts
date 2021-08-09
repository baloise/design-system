/// <reference types="cypress" />

import {Mixin} from './mixins'

export interface Disableable<T> {
  /**
   * Asserts that the element is enabled or disabled.
   */
  assertIsEnabled(enabled?: boolean): T;
}

export const EnableableMixin: Mixin = ({selector, creator}) => ({
  assertIsEnabled: (enabled = true) => {
    cy.get(selector).should(enabled ? 'not.be.disabled' : 'be.disabled');
    return creator();
  },
})

