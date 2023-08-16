/// <reference types="cypress" />

import '@baloise/design-system-testing/src/add-custom-commands'

declare global {
  namespace Cypress {
    interface Chainable {
      getDescribingElement(): Chainable<void>
      shouldBeInvalid(): Chainable<void>
      shouldBeValid(): Chainable<void>
      getByLabelText(labelText: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('getDescribingElement', { prevSubject: true }, subject => {
  return cy.wrap(subject).then(subjectElement => {
    const ariaDescribedBy = subjectElement.attr('aria-describedby')
    if (ariaDescribedBy) {
      return cy.get(`[id="${ariaDescribedBy}"]`)
    } else {
      throw new Error(`The subject element does not have an aria-describedby attribute.`)
    }
  })
})

Cypress.Commands.add('shouldBeInvalid', { prevSubject: true }, subject => {
  return cy.wrap(subject).should('have.attr', 'aria-invalid', 'true')
})

Cypress.Commands.add('shouldBeValid', { prevSubject: true }, subject => {
  return cy.wrap(subject).should('not.have.attr', 'aria-invalid', 'true')
})

Cypress.Commands.add('getByLabelText', labelText => {
  return cy
    .contains('label', labelText)
    .invoke('attr', 'for')
    .then(forAttributeValue => {
      cy.get(`input[id="${forAttributeValue}"], textarea[id="${forAttributeValue}"]`)
    })
})
