/// <reference types="cypress" />

import {Mixin} from './mixins';

export interface Lengthable<T> {
  /**
   * Get number of elements.
   */
  length(locator: string): T;
}

export const LengthableMixin: Mixin = ({selector}) => ({
  length: (locator: string) => {
    return cy.get(selector).then($body => $body.find(locator).length);
  }
});
