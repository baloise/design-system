/// <reference types="cypress" />

import {Mixin} from './mixins';

export interface Invokable<T> {
  /**
   * Invoke a function on the previously yielded subject.
   */
  invoke(locator: string): T;
}

export const InvokableMixin: Mixin = ({selector}) => ({
  invoke: (attribute: string) => {
    return cy.get(selector).invoke(attribute);
  }
});
