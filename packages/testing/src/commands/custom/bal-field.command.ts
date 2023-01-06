import { log, wrapOptions } from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.add(
  'balFieldFindHint',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.field.hint, o)
      .then($el => {
        log('balFieldFindHint', '', $el, options)
        return $el
      })
      .waitForComponents()
  },
)
