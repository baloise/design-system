import { log, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balModalFindOpen',
  {
    prevSubject: false,
  },
  options => {
    const o = wrapOptions(options)
    return cy
      .getComponent('bal-modal[aria-presented="true"] .sc-bal-modal', o)
      .then($el => {
        log('balModalFindOpen', '', $el, options)
        return $el
      })
      .waitForComponents()
  },
)

Cypress.Commands.add(
  'balModalIsOpen',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balAccordionIsOpen', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('have.attr', 'aria-presented', 'true')
  },
)

Cypress.Commands.add(
  'balModalIsClosed',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balModalIsClosed', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('not.have.attr', 'aria-presented')
  },
)

Cypress.Commands.add(
  'balModalClose',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balModalIsClosed', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).then($modal => {
      return cy.wrapComponent($modal, o).find('.data-test-modal-close', o).waitForComponents().click()
    })
  },
)
