/// <reference types="cypress" />

import { selectors, isDatepicker, wrapRoot, isCheckbox } from '../helpers'

Cypress.Commands.overwrite('clear', (originalFn, element: Cypress.Chainable<JQuery>, options) => {
  if (isCheckbox(element)) {
    return wrapRoot(element, selectors.checkbox.input, $el => originalFn($el, options))
  }

  if (isDatepicker(element)) {
    return wrapRoot(element, selectors.datepicker.input, $el => originalFn($el, options))
  }

  return originalFn(element, options)
})
