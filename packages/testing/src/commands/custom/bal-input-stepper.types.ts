/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Increases the value of the control
     */
    balInputStepperIncrease(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Decreases the value of the control
     */
    balInputStepperDecrease(options?: Partial<Loggable>): Chainable<JQuery>
  }
}
