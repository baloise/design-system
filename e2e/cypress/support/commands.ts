/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '../../../packages/testing/src/add-custom-commands'
import '../../../packages/testing/src/add-override-commands'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to spy on custom events.
       * @example cy.get('bal-button').spyEvent('balChange')
       */
      spyEvent(event: string, asEventName?: string): Chainable<Element>
      /**
       * Custom command to asset event detail content.
       * @example cy.get('@balChange').shouldHaveEventDetail('balChange', 2)
       */
      shouldHaveEventDetail(value: any, time?: number): Chainable<Element>
      /**
       * Sets attribute/property to component
       */
      setProperty(attr: string, value: any): Chainable<Element>
      /**
       * Checks if the component has attribute/property
       */
      hasProperty(attr: string, value: any): Chainable<Element>
      /**
       * Removes attribute/property to component
       */
      removeProperty(attr: string): Chainable<Element>
      /**
       * Wait until the first browser paint has been done
       */
      waitAfterFramePaint(): Chainable<Element>
      /**
       * Wait until the browser goes in idle mode
       */
      waitAfterIdleCallback(): Chainable<Element>
    }
  }
}

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

Cypress.Commands.add('shouldHaveEventDetail', { prevSubject: 'optional' }, (subject, value: any, time = 0) => {
  return cy.wrap(subject, { log: false }).then(event => {
    const spy = event as any as sinon.SinonSpy
    const detail = spy.getCall(time).args[0].detail
    Cypress.log({
      $el: subject as any,
      type: 'parent',
      displayName: 'hasEventDetail',
      message: JSON.stringify(detail),
    })
    expect(detail).deep.equal(value)
  }) as any
})

Cypress.Commands.add('setProperty', { prevSubject: 'element' }, (subject, attr: string, value: any) => {
  Cypress.log({
    $el: subject,
    type: 'parent',
    displayName: 'setProp',
    message: `${attr}="${value}"`,
  })
  return cy
    .wrapComponent(subject, { log: false })
    .invoke({ log: false }, 'attr', attr, value)
    .waitForComponents()
    .wait(1, { log: false }) as any
})

Cypress.Commands.add('hasProperty', { prevSubject: 'element' }, (subject, attr: string, value: any) => {
  Cypress.log({
    $el: subject,
    type: 'parent',
    displayName: 'hasProp',
    message: `${attr}="${value}"`,
  })
  return cy.wrapComponent(subject, { log: false }).should('have.attr', attr, value).waitForComponents() as any
})

Cypress.Commands.add('removeProperty', { prevSubject: 'element' }, (subject, attr: string) => {
  Cypress.log({
    $el: subject as any,
    type: 'parent',
    displayName: 'removeProp',
    message: attr,
  })
  return cy
    .wrapComponent(subject, { log: false })
    .invoke({ log: false }, 'removeAttr', attr)
    .waitForComponents()
    .wait(1, { log: false }) as any
})
