/// <reference types="cypress" />

import { Mixin } from './mixins';

export interface Waitable<T> {
    wait(time: number): T;
}

export const WaitableMixin: Mixin = ({ selector, creator }) => ({
    wait: (time: number) => {
      cy.get(selector).wait(time);
      return creator();
    }
});
