/// <reference types="cypress" />

import {Mixin} from './mixins'

export interface Disableable<T> {
  /**
   * Asserts that the element is enabled or disabled.
   */
  assertIsDisabled(enabled?: boolean): T;
}

export const DisableableMixin: Mixin = ({selector, creator}) => ({
  assertIsDisabled: (disabled = true) => {
    cy.get(selector).should(disabled ? 'be.disabled' : 'not.be.disabled');
    return creator();
  },
})
