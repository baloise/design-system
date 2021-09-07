/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the hint content overlay with the title, content and the close button.
     */
    balHintFindOverlay(): Chainable<JQuery>
    /**
     * Returns the close button of the overlay content.
     */
    balHintFindCloseButton(): Chainable<JQuery>
  }
}
