/// <reference types="cypress" />

import {Mixin} from './mixins';

export interface Thenable<T> {
  /**
   * Enables you to work with the subject yielded from the previous command.
   */
  then(callBack: Function): T;
}

export const ThenableMixin: Mixin = ({selector, creator}) => ({
  then: (callBack: Function) => {
    cy.get(selector).then((param?) => callBack(param));
    return creator();
  }
});
