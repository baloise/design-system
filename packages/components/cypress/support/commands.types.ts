/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    visitPage(url: string): void
  }
}
