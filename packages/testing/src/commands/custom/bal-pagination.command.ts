import { log, selectors, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balPaginationFindPages',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.pagination.pages + ':visible', o)
      .then($el => {
        log('balPaginationFindPages', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balPaginationFindCurrentPage',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(`${selectors.pagination.button}.is-primary:visible`, o)
      .then($el => {
        log('balPaginationFindCurrentPage', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balPaginationFindNextButton',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.pagination.next, o)
      .then($el => {
        log('balPaginationFindNextButton', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balPaginationFindPreviousButton',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.pagination.previous, o)
      .then($el => {
        log('balPaginationFindPreviousButton', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)
