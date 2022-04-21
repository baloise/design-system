/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the visible toasts.
     */
    balToastFind(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
