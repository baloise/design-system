import { log, wrapOptions } from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.add(
  'balPopupIsOpen',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balPopupIsOpen', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('have.attr', 'aria-presented', 'true')
  },
)

Cypress.Commands.add(
  'balPopupIsClosed',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balPopupIsClosed', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('not.have.attr', 'aria-presented')
  },
)
