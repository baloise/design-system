/// <reference types="cypress" />

import {Mixin} from './mixins'

export interface Disableable<T> {
  /**
   * Asserts that the element is enabled or disabled.
   */
  assertIsDisabled(enabled?: boolean): T;
}

export const DisableableMixin: Mixin = ({selector, creator}) => ({
  assertIsDisabled: (enabled = true) => {
    cy.get(selector).should(enabled ? 'have.attr' : 'not.have.attr', 'disabled');
    return creator();
  },
})
