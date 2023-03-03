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
    return cy.wrap(element, o)
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

Cypress.Commands.add('disableAnimation', () => {
  cy.window().then(win => {
    ;(win as any).BaloiseDesignSystem.config.animated = false
  })
})

Cypress.Commands.add('waitForDesignSystem', () => {
  cy.document().then(document => document.fonts.ready)

  cy.disableAnimation()

  cy.get('bal-app,bal-doc-app,.bal-app', { log: false })
    .first({ log: false })
    .waitForComponents({ log: false })
    .invoke({ log: false }, 'attr', 'ready')
    .should($el => {
      expect($el, 'if bal-app is ready').to.eq('')
    })
    .wait(100, { log: false })

  cy.get('bal-app,bal-doc-app,.bal-app', { log: false })
    .first({ log: false })
    .then($app => {
      Cypress.log({
        type: 'parent',
        $el: $app,
        displayName: 'bal-app',
        message: 'is ready 🚀',
      })
    })
})
