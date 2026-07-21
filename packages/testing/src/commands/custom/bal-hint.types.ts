/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the hint content overlay with the title, content and the close button.
     */
    balHintFindOverlay(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the close button of the overlay content.
     */
    balHintFindCloseButton(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
