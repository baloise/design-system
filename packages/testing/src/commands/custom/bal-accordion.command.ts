import { log, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balAccordionIsOpen',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balAccordionIsOpen', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('have.class', 'bal-accordion--active', 'true')
  },
)

Cypress.Commands.add(
  'balAccordionIsClosed',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balAccordionIsClosed', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('not.have.class', 'bal-accordion--active')
  },
)
