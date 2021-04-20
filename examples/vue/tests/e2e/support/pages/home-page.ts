import { ButtonAccessor, dataTestSelector } from '@baloise/ui-library-testing'

export class HomePage {
  button = ButtonAccessor(dataTestSelector('count-button'))

  open(): void {
    cy.visit('/')
  }

  getCountMessage(): Cypress.Chainable<JQuery<HTMLBalCardSubtitleElement>> {
    return cy.get(dataTestSelector('count-message'))
  }
}
