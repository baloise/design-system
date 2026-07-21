import { selectors } from '../../selectors'
import { isCheckbox, isRadio, wrapCommand, wrapOptions } from '../helpers'

Cypress.Commands.overwrite('check', (originalFn: any, element: any, options) => {
  const command = wrapCommand('check', element, '', $el => originalFn($el, wrapOptions(options)))

  if (isCheckbox(element) || isRadio(element)) {
    return cy.wrap(element, { log: false }).click(options).wrap(element, { log: false })
  }

  return originalFn(element, options)
})
