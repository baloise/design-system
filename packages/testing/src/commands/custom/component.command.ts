import { areComponentsReady, log, waitAfterFramePaint, waitAfterIdleCallback, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'waitForComponents',
  {
    prevSubject: 'optional',
  },
  (subject, options?: Partial<Cypress.Loggable>) => {
    cy.document({ log: false }).then(document => document.fonts.ready)

    log('waitForComponents', '', subject, options)
    const o = wrapOptions(options)
    return cy
      .wrap(subject, o)
      .then(($el: any) => areComponentsReady($el))
      .then(() => waitAfterFramePaint())
      .then(() => waitAfterIdleCallback())
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
  cy.window({ log: false }).then(win => {
    ;(win as any).BaloiseDesignSystem.config.animated = false
  })
})

Cypress.Commands.add('disableLogger', () => {
  cy.window({ log: false }).then(win => {
    ;(win as any).BaloiseDesignSystem.config.logger = {
      components: [],
      event: false,
      lifecycle: false,
      render: false,
      custom: false,
    }
  })
})

Cypress.Commands.add('waitForDesignSystem', () => {
  cy.document({ log: false }).then(document => document.fonts.ready)

  cy.get('bal-app,.bal-app', { log: false })
    .first({ log: false })
    .then($app => {
      Cypress.log({
        type: 'parent',
        $el: $app,
        displayName: 'bal-app',
        message: 'wait for DesignSystem to be ready',
      })
    })
    .waitForComponents({ log: false })
    .invoke({ log: false }, 'attr', 'ready')
    .should($el => {
      expect($el, 'if bal-app is ready').to.eq('')
    })
    .disableAnimation()
    .disableLogger()

  cy.get('bal-app,.bal-app', { log: false })
    .first({ log: false })
    .then($app => {
      Cypress.log({
        type: 'parent',
        $el: $app,
        displayName: 'bal-app',
        message: 'DesignSystem is ready 🚀',
      })
    })
    .then(() => waitAfterFramePaint())
    .then(() => waitAfterIdleCallback())
})
