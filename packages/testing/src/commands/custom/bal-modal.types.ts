/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Assert if the modal is open.
     */
    balModalIsOpen(): Chainable<JQuery>
    /**
     * Assert if the modal is closed.
     */
    balModalIsClosed(): Chainable<JQuery>
  }
}
