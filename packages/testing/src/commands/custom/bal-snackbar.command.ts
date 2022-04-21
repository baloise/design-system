import { log, selectors, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balSnackbarFind',
  {
    prevSubject: false,
  },
  options => {
    const o = wrapOptions(options)
    return cy
      .getComponent(selectors.snackbar.main, o)
      .then($el => {
        log('balSnackbarFind', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)
