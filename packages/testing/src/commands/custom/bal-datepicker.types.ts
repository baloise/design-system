/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Opens and closes the datepicker popover.
     */
    balDatepickerToggle(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Assert if the datepicker popover is open.
     */
    balDatepickerIsOpen(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Assert if the datepicker popover is closed.
     */
    balDatepickerIsClosed(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Picks the date in the datepicker like a human.
     */
    balDatepickerPick(date: Date, options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Asserts if the given date is in range in the datepicker popover.
     */
    balDatepickerIsDateInRange(date: Date, options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Asserts if the given date is not in range in the datepicker popover.
     */
    balDatepickerIsDateNotInRange(date: Date, options?: Partial<Loggable>): Chainable<JQuery>
  }
}
