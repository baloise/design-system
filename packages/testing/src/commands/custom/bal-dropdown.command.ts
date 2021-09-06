import { selectors } from '../helpers'

Cypress.Commands.add(
  'balDropdownToggle',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find(selectors.dropdown.trigger).click().wrap(subject)
  },
)

Cypress.Commands.add(
  'balDropdownIsOpen',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).should('have.attr', 'is-active', '')
  },
)

Cypress.Commands.add(
  'balDropdownIsClosed',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).should('not.have.attr', 'is-active')
  },
)

Cypress.Commands.add(
  'balDropdownTriggerContains',
  {
    prevSubject: true,
  },
  (subject, content, options) => {
    return cy.wrap(subject).find(selectors.dropdown.trigger).contains(content, options).wrap(subject)
  },
)

Cypress.Commands.add(
  'balDropdownMenuContains',
  {
    prevSubject: true,
  },
  (subject, content, options) => {
    return cy.wrap(subject).find(selectors.dropdown.menu).contains(content, options).wrap(subject)
  },
)
