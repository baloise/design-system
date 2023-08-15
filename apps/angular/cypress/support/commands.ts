/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// import '@baloise/design-system-testing/dist/add-custom-commands'
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
