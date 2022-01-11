Cypress.Commands.add(
  'balAccordionIsOpen',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).should('have.attr', 'aria-presented', 'true')
  },
)

Cypress.Commands.add(
  'balAccordionIsClosed',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).should('not.have.attr', 'aria-presented')
  },
)
