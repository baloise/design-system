/// <reference types="cypress" />

import { isDatepicker, selectors, wrapRoot } from '../helpers'

Cypress.Commands.overwrite('type', (originalFn, element: Cypress.Chainable<JQuery>, text, options) => {
  if (isDatepicker(element)) {
    return wrapRoot(element, selectors.datepicker.input, $el => originalFn($el, text, options))
  }

  return originalFn(element, text, options)
})
