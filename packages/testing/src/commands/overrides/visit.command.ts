import { deepReady } from '@baloise/design-system-next-components'

Cypress.Commands.overwrite<any>('visit', (originalFn, url) => {
  originalFn(url as any)
  cy.get('bal-app,bal-doc-app,.bal-app', { log: false })
    .first({ log: false })
    .then($app => {
      return new Cypress.Promise(resolve => {
        deepReady($app.get(0)).then(() => resolve())
        Cypress.log({
          type: 'parent',
          $el: $app,
          displayName: 'bal-app',
          message: 'is ready 🚀',
        })
      })
    })
})
