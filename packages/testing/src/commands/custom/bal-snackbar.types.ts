/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the visible snackbars.
     */
    balSnackbarFind(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
