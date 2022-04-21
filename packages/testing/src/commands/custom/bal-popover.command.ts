import { log, selectors, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balPopoverToggle',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balPopoverToggle', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).find(`[${selectors.popover.trigger}]`, o).click(o).wrapComponent(subject, o)
  },
)

Cypress.Commands.add(
  'balPopoverIsOpen',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balPopoverIsOpen', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('have.attr', 'aria-presented', 'true')
  },
)

Cypress.Commands.add(
  'balPopoverIsClosed',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balPopoverIsClosed', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('not.have.attr', 'aria-presented')
  },
)

Cypress.Commands.add(
  'balPopoverTriggerContains',
  {
    prevSubject: true,
  },
  (subject, content, options) => {
    log('balPopoverTriggerContains', content, subject, options)
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(`[${selectors.popover.trigger}]`, o)
      .contains(content, options)
      .wrapComponent(subject, o)
  },
)

Cypress.Commands.add(
  'balPopoverContentContains',
  {
    prevSubject: true,
  },
  (subject, content, options) => {
    log('balPopoverContentContains', content, subject, options)
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.popover.content, o)
      .contains(content, options)
      .wrapComponent(subject, o)
  },
)
