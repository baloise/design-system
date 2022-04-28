import { areComponentsReady, log, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'waitForComponents',
  {
    prevSubject: 'optional',
  },
  (subject, options?: Partial<Cypress.Loggable>) => {
    log('waitForComponents', '', subject, options)
    const o = wrapOptions(options)
    return cy
      .wrap(subject, o)
      .then(($el: any) => areComponentsReady($el))
      .wrap(subject, o) as any
  },
)

Cypress.Commands.add(
  'wrapComponent',
  {
    prevSubject: false,
  },
  (element, options?: Partial<Cypress.Loggable>) => {
    log('wrapComponent', '', element, options)
    const o = wrapOptions(options)
    return cy.wrap(element, o).waitForComponents(o)
  },
)

Cypress.Commands.add(
  'getComponent',
  {
    prevSubject: false,
  },
  (selector, options?: Partial<Cypress.Loggable>) => {
    log('getComponent', selector, null, options)
    const o = wrapOptions(options)
    return cy.get(selector, o).waitForComponents(o)
  },
)
