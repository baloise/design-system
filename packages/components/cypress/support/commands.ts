// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('page', (url: string) => {
  Cypress.log({
    type: 'parent',
    displayName: 'page',
    message: url,
  })

  cy.visit(url, { log: false }).then(() => {
    return cy.get('bal-doc-app, bal-app, .bal-app', { log: false }).waitForComponents({ log: false })
  })
})

Cypress.Commands.add('pageA11y', (url: string) => {
  cy.page(url)
  cy.injectAxe()
})

Cypress.Commands.add('testA11y', { prevSubject: 'element' }, (subject, options = null) => {
  cy.checkA11y(
    subject as any,
    {
      ...options,
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
      },
    },
    violations => {
      const message = `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
        violations.length === 1 ? 'was' : 'were'
      } detected`
      cy.task('log', message)
      // pluck specific keys to keep the table readable
      const violationData = violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
      }))

      cy.task('table', violationData)
    },
    false, // skip a11y failures
  )
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

Cypress.Commands.add('shouldHaveEventDetail', { prevSubject: 'optional' }, (subject, value: any, time = 0) => {
  Cypress.log({
    $el: subject as any,
    type: 'parent',
    displayName: 'hasEventDetail',
    message: value,
  })
  return cy.wrap(subject, { log: false }).then(event => {
    const spy = event as any as sinon.SinonSpy
    expect(spy.getCall(time).args[0].detail).deep.equal(value)
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
