/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns all the page buttons.
     */
    balPaginationFindPages(): Chainable<JQuery>
    /**
     * Returns the current listed page button.
     */
    balPaginationFindCurrentPage(): Chainable<JQuery>
    /**
     * Returns the next button to navigate to next page.
     */
    balPaginationFindNextButton(): Chainable<JQuery>
    /**
     * Returns the previous button to navigate to previous page.
     */
    balPaginationFindPreviousButton(): Chainable<JQuery>
  }
}
