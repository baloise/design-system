/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Asserts if the accordion is open.
     */
    balAccordionIsOpen(): Chainable<JQuery>
    /**
     * Asserts if the accordion is closed.
     */
    balAccordionIsClosed(): Chainable<JQuery>
  }
}
