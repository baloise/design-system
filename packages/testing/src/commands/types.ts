/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // ############################################################
    // ##
    // ## Accordion
    // ##
    // ############################################################
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balAccordionIsOpen(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balAccordionIsClosed(): Chainable<JQuery>
    // ############################################################
    // ##
    // ## Datepicker
    // ##
    // ############################################################
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerToggle(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsOpen(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsClosed(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerPick(date: Date): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsDateInRange(date: Date): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsDateNotInRange(date: Date): Chainable<JQuery>
    // ############################################################
    // ##
    // ## Dropdown
    // ##
    // ############################################################
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownToggle(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownIsOpen(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownIsClosed(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownTriggerContains(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownMenuContains(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>
    // ############################################################
    // ##
    // ## Modal
    // ##
    // ############################################################
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balModalIsOpen(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balModalIsClosed(): Chainable<JQuery>
    // ############################################################
    // ##
    // ## Select
    // ##
    // ############################################################
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balSelectFindOptions(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balSelectFindChips(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balSelectShouldHaveOptions(labels: string[], dataType?: 'label' | 'value'): Chainable<JQuery>
    // ############################################################
    // ##
    // ## Tabs
    // ##
    // ############################################################
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabsFindActionButton(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabsFindItems(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabsShouldHaveItems(labels: string[], dataType?: 'label' | 'value'): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabItemShouldHaveState(state: 'done' | 'failed' | 'active' | 'disabled'): Chainable<JQuery>
    // ############################################################
    // ##
    // ## Toast
    // ##
    // ############################################################
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balToastFind(): Chainable<JQuery>
  }
}
