/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns all the page buttons.
     */
    balPaginationFindPages(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the current listed page button.
     */
    balPaginationFindCurrentPage(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the next button to navigate to next page.
     */
    balPaginationFindNextButton(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the previous button to navigate to previous page.
     */
    balPaginationFindPreviousButton(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
