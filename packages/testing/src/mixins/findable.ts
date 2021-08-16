/// <reference types="cypress" />

import {Mixin} from './mixins';

export interface Findable<T> {
  /**
   * Get the descendent DOM elements of a specific selector.
   */
  find(locator: string): T;
}

export const FindableMixin: Mixin = ({selector, creator}) => ({
  find: (locator: string) => {
    cy.get(selector).find(locator);
    return creator();
  }
});
