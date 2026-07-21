/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Open an application with the Design System and waits
     * until the Design System has fully loaded.
     */
    visitBalApp(url: string, options?: Partial<VisitOptions>): Chainable<AUTWindow>
  }
}
