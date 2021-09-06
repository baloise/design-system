import { isDatepicker, isInput, selectors, wrapRoot } from '../helpers'

Cypress.Commands.overwrite('type', (originalFn, element: Cypress.Chainable<JQuery>, content, options) => {
  if (isDatepicker(element)) {
    return wrapRoot(element, selectors.datepicker.input, $el => originalFn($el, content, options))
  }

  if (isInput(element)) {
    return wrapRoot(element, selectors.input.main, $el => originalFn($el, content, options))
  }

  return originalFn(element, content, options)
})
