/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Finds the open modal and returns it.
     */
    balModalFindOpen(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Assert if the modal is open.
     */
    balModalIsOpen(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Assert if the modal is closed. Only works for modals,
     * which are not created with the modal service.
     */
    balModalIsClosed(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Closes the selected modal.
     */
    balModalClose(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
