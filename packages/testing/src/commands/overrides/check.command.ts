import { isCheckbox, isRadio, selectors, wrapCommand, wrapOptions } from '../helpers'

Cypress.Commands.overwrite('check', (originalFn, element: Cypress.Chainable<JQuery>, options) => {
  if (isRadio(element) || isCheckbox(element)) {
    return cy.wrapComponent(element, { log: false }).click()
  }

  return originalFn(element, options)
})
