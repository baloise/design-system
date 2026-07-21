/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Asserts if the accordion is open.
     */
    balAccordionIsOpen(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Asserts if the accordion is closed.
     */
    balAccordionIsClosed(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
