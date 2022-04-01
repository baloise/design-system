Cypress.Commands.add(
  'balModalFindOpen',
  {
    prevSubject: false,
  },
  () => {
    return cy.get('bal-modal[aria-presented="true"] .sc-bal-modal')
  },
)

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
      return cy.wrap($modal).should('not.have.attr', 'aria-presented')
    })
  },
)

Cypress.Commands.add(
  'balModalClose',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).then($modal => {
      return cy.wrap($modal).find('.data-test-modal-close').click()
    })
  },
)
