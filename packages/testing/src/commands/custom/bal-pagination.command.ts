import { selectors } from '../helpers'

Cypress.Commands.add(
  'balPaginationFindPages',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.pagination.pages)
  },
)

Cypress.Commands.add(
  'balPaginationFindCurrentPage',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(`${selectors.pagination.pages}.is-current`)
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
