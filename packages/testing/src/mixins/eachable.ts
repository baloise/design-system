/// <reference types="cypress" />

import {Mixin} from './mixins';

export interface Eachable<T> {
  /**
   * Iterate through an array like structure.
   */
  each(callBack: Function): T;
}

export const EachableMixin: Mixin = ({selector, creator}) => ({
  each: (callBack: Function) => {
    cy.get(selector).each(() => callBack());
    return creator();
  }
});
