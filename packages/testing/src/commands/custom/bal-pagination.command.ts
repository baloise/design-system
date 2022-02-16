import { selectors } from '../helpers'

Cypress.Commands.add(
  'balPaginationFindPages',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.pagination.pages + ':visible')
  },
)

Cypress.Commands.add(
  'balPaginationFindCurrentPage',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(`${selectors.pagination.button}.is-primary:visible`)
  },
)

Cypress.Commands.add(
  'balPaginationFindNextButton',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.pagination.next)
  },
)

Cypress.Commands.add(
  'balPaginationFindPreviousButton',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.pagination.previous)
  },
)
