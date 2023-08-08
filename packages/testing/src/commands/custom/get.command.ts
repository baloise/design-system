import { byTestId } from '../../selectors'
import { log, wrapOptions } from '../helpers'

Cypress.Commands.add('getByTestId', (testID, options?: Partial<Cypress.Loggable>) => {
  const o = wrapOptions(options)
  const element = cy.get(byTestId(testID), o).waitForComponents(o)
  element.then(0, $el => log('getByTestId', testID, $el, options))
  return element
})

Cypress.Commands.add('getByPlaceholder', (placeholder, options?: Partial<Cypress.Loggable>) => {
  const o = wrapOptions(options)
  const element = cy.get(`input[placeholder="${placeholder}"]`, o).waitForComponents(o)
  element.then(o, $el => log('getByPlaceholder', placeholder, $el, options))
  return element
})

Cypress.Commands.add('getByRole', (role, options) => {
  const o = wrapOptions(options)

  if (role === 'button') {
    const buttons = cy.get('button, [role="button"]', o)

    const visibleButtons = buttons.filter((_index, element) => {
      const isElementAriaHidden = options.hidden === true ? false : !!Cypress.$(element).attr('aria-hidden')
      return !isElementAriaHidden
    }, o)

    const labeledButtons = visibleButtons.filter((_index, element) => {
      if (options.name === undefined || options.name === null || options.name === '') {
        return true
      }
      const label = Cypress.$(element).attr('aria-label')
      const title = Cypress.$(element).attr('title')
      const text = Cypress.$(element).text()
      return text === options.name || label === options.name || title === options.name
    }, o)

    const firstButton = labeledButtons.first(o).waitForComponents(o)

    firstButton.then(o, $el => log('getByRole', `button ${JSON.stringify(options)}`, $el, options))
    return firstButton
  }

  return cy.get(o).waitForComponents(o)
})
