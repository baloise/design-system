/// <reference types="cypress" />

import { isCheckbox, selectors, wrapRoot } from '../helpers'

Cypress.Commands.overwrite('check', (originalFn, element: Cypress.Chainable<JQuery>, options) => {
  if (isCheckbox(element)) {
    return wrapRoot(element, selectors.checkbox.input, $el => {
      originalFn($el, options)
    })
      .click({ force: true })
      .wrap(element)
  }

  return originalFn(element, options)
})
