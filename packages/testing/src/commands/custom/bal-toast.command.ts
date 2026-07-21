import { log, wrapOptions } from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.add(
  'balToastFind',
  {
    prevSubject: false,
  },
  options => {
    const o = wrapOptions(options)
    return cy
      .getComponent(selectors.toast.main, o)
      .then($el => {
        log('balToastFind', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)
