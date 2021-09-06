Cypress.Commands.add(
  'balAccordionIsOpen',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).should('have.attr', 'is-active', '')
  },
)

Cypress.Commands.add(
  'balAccordionIsClosed',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).should('not.have.attr', 'is-active')
  },
)
