/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the action button element.
     */
    balTabsFindActionButton(): Chainable<JQuery>
    /**
     * Returns the tab items.
     */
    balTabsFindItems(): Chainable<JQuery>
    /**
     * Assert that the tab has the given item.
     */
    balTabsShouldHaveItems(labels: string[], dataType?: 'label' | 'value'): Chainable<JQuery>
    /**
     * Assert that the tab item has the  given state.
     */
    balTabItemShouldHaveState(state: 'done' | 'failed' | 'active' | 'disabled'): Chainable<JQuery>
  }
}
