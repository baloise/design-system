import { log, selectors, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balHintFindOverlay',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.hint.content, o)
      .then($el => {
        log('balHintFindOverlay', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balHintFindCloseButton',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.hint.close, o)
      .then($el => {
        log('balHintFindCloseButton', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)
