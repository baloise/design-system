import { isCheckbox, isRadio } from '../helpers'

Cypress.Commands.overwrite('uncheck', (originalFn: any, element: any, options) => {
  if (isRadio(element) || isCheckbox(element)) {
    return cy.wrapComponent(element, { log: false }).click()
  }

  return originalFn(element, options)
})
