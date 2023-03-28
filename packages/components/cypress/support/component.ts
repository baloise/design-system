// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { mount } from 'cypress/vue'
import { waitAfterFramePaint, waitAfterIdleCallback } from '../../src/utils/helpers'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)

Cypress.Commands.add('disableAnimation', () => {
  cy.window().then(win => {
    ;(win as any).BaloiseDesignSystem.config.animated = false
  })
})

export const deepReady = async (el: any | undefined, full = false): Promise<void> => {
  const element = el as any
  if (element) {
    if (element.componentOnReady !== null && element.componentOnReady !== undefined) {
      const stencilEl = await element.componentOnReady()
      if (!full && stencilEl !== null && stencilEl !== undefined) {
        return
      }
    }
    await Promise.all(Array.from(element.children).map(child => deepReady(child, full)))
  }
}

export const areComponentsReady = ($el: any) => {
  const queue = []
  for (let index = 0; index < $el.length; index++) {
    const element = $el[index]
    queue.push(deepReady(element, true))
  }
  return Promise.all(queue)
}

Cypress.Commands.add(
  'waitForComponents',
  {
    prevSubject: 'element',
  },
  (subject, options?: Partial<Cypress.Loggable>) => {
    cy.document({ log: false }).then(document => document.fonts.ready)

    return cy
      .wrap(subject, options)
      .then(($el: any) => areComponentsReady($el))
      .then(() => waitAfterFramePaint())
      .then(() => waitAfterIdleCallback())
      .wrap(subject, options)
  },
)

Cypress.Commands.add('waitAfterFramePaint', () => {
  cy.then(() => waitAfterFramePaint())
})

Cypress.Commands.add('waitAfterIdleCallback', () => {
  cy.then(() => waitAfterIdleCallback())
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
})

Cypress.Commands.add('spyEvent', { prevSubject: 'element' }, (subject, event: string, asEventName?: string) => {
  if (asEventName === undefined) {
    asEventName = event
  }
  Cypress.log({
    $el: subject as any,
    type: 'parent',
    displayName: 'spyEvent',
    message: `${event} as @${asEventName}`,
  })
  return cy.wrap(subject, { log: false }).then($el => $el.on(event, cy.spy().as(asEventName))) as any
})
