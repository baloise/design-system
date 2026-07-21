/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Asserts if the popover is open.
     */
    balPopupIsOpen(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Asserts if the popover is closed.
     */
    balPopupIsClosed(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
