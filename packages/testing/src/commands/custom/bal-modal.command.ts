Cypress.Commands.add(
  'balModalIsOpen',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).should('have.attr', 'aria-presented', 'true')
  },
)

Cypress.Commands.add(
  'balModalIsClosed',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).then($modal => {
      console.log($modal)
      return cy.wrap($modal).should('not.exist')
    })

    // .should('not.have.attr', 'aria-presented')
  },
)
