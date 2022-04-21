import { byTestId } from '../../selectors'
import { log, wrapOptions } from '../helpers'

Cypress.Commands.add('getByTestId', (testID, options?: Partial<Cypress.Loggable>) => {
  log('getByTestId', testID, null, options)
  const o = wrapOptions(options)
  return cy.get(byTestId(testID), o).waitForComponents(o)
})
