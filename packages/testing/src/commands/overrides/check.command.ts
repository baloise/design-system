import { isCheckbox, isRadio, wrapCommand, wrapOptions } from '../helpers'

Cypress.Commands.overwrite('check', (originalFn: any, element: any, options) => {
  const command = wrapCommand('check', element, '', $el => originalFn($el, wrapOptions(options)))
  const hasShadowRoot = (element as any)[0]?.shadowRoot

  if (isCheckbox(element) || isRadio(element)) {
    if (hasShadowRoot) {
      return cy.wrap(element, { log: false }).shadow().click(options).wrap(element, { log: false })
    }

    return cy.wrap(element, { log: false }).click(options).wrap(element, { log: false })
  }

  return originalFn(element, options)
})
