import { selectors } from '../helpers'

Cypress.Commands.add(
  'balPopoverToggle',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(`[${selectors.popover.trigger}]`).click().wrap(subject)
  },
)

Cypress.Commands.add(
  'balPopoverIsOpen',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).should('have.attr', 'is-active', '')
  },
)

Cypress.Commands.add(
  'balPopoverIsClosed',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).should('not.have.attr', 'is-active')
  },
)

Cypress.Commands.add(
  'balPopoverTriggerContains',
  {
    prevSubject: true,
  },
  (subject, content, options) => {
    return cy.wrap(subject).find(`[${selectors.popover.trigger}]`).contains(content, options).wrap(subject)
  },
)

Cypress.Commands.add(
  'balPopoverContentContains',
  {
    prevSubject: true,
  },
  (subject, content, options) => {
    return cy.wrap(subject).find(selectors.popover.content).contains(content, options).wrap(subject)
  },
)
