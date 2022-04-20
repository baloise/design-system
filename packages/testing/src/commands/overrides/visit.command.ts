import { deepReady } from '@baloise/design-system-components'

Cypress.Commands.overwrite('visit', (originalFn, element: Cypress.Chainable<JQuery>, content, options) => {
  originalFn(element, content, options)
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
