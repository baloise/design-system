import { isCheckbox, isRadio, selectors, wrapRoot } from '../helpers'

Cypress.Commands.overwrite('check', (originalFn, element: Cypress.Chainable<JQuery>, options) => {
  if (isCheckbox(element)) {
    return wrapRoot(element, selectors.checkbox.input, $el => {
      originalFn($el, {
        ...options,
        force: true,
      })
    })
  }

  if (isRadio(element)) {
    return wrapRoot(element, selectors.radio.input, $el => {
      originalFn($el, {
        ...options,
        force: true,
      })
    })
  }

  return originalFn(element, options)
})
