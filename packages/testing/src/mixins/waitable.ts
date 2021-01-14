/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Waitable<T> {
  /**
   * Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command.
   */
  wait(time: number): T
}

export const WaitableMixin: Mixin = ({ selector, creator }) => ({
  wait: (time: number) => {
    cy.get(selector).wait(time)
    return creator()
  },
})
