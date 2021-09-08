/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the visible snackbars.
     */
    balSnackbarFind(): Chainable<JQuery>
  }
}
