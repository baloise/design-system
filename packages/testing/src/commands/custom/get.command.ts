import { byTestId } from '../../selectors'
import { log, wrapOptions } from '../helpers'

Cypress.Commands.add('getByTestId', (testID, options?: Partial<Cypress.Loggable>) => {
  const o = wrapOptions(options)
  const element = cy.get(byTestId(testID), o).waitForComponents(o)
  element.then(o, $el => log('getByTestId', testID, $el, options))
  return element
})
