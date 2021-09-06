/// <reference types="cypress" />

import { isAccordion, isButton, isCheckbox, selectors, wrapRoot } from '../helpers'

Cypress.Commands.overwrite('contains', (originalFn, element: Cypress.Chainable<JQuery>, text, options) => {
  if (isAccordion(element)) {
    return wrapRoot(element, selectors.accordion.button, $el => originalFn($el, text, options))
  }

  if (isButton(element)) {
    return wrapRoot(element, selectors.button.label, $el => originalFn($el, text, options))
  }

  if (isCheckbox(element)) {
    return wrapRoot(element, selectors.checkbox.text, $el => originalFn($el, text, options))
  }

  return originalFn(element, text, options)
})
