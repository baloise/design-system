/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Opens and closes the datepicker dropdown.
     */
    balDatepickerToggle(): Chainable<JQuery>
    /**
     * Assert if the datepicker dropdown is open.
     */
    balDatepickerIsOpen(): Chainable<JQuery>
    /**
     * Assert if the datepicker dropdown is closed.
     */
    balDatepickerIsClosed(): Chainable<JQuery>
    /**
     * Picks the date in the datepicker like a human.
     */
    balDatepickerPick(date: Date): Chainable<JQuery>
    /**
     * Asserts if the given date is in range in the datepicker dropdown.
     */
    balDatepickerIsDateInRange(date: Date): Chainable<JQuery>
    /**
     * Asserts if the given date is not in range in the datepicker dropdown.
     */
    balDatepickerIsDateNotInRange(date: Date): Chainable<JQuery>
  }
}
