/// <reference types="cypress" />

import '@baloise/design-system-testing/src/add-custom-commands'

declare global {
  namespace Cypress {
    interface GetByRoleOptions {
      name?: string
      hidden?: boolean
    }

    interface Chainable {
      getControl(labelText: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      getDescribingElement(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      shouldBeInvalid(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      shouldBeValid(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      getByLabelText(
        labelText: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<void>
      getByPlaceholder(
        placeholder: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery>
      getByRole(
        role: 'button',
        options: GetByRoleOptions & Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery>
    }
  }
}

const wrapOptions = o => o
const log = console.log

Cypress.Commands.add('getDescribingElement', { prevSubject: true }, (subject, options?: Partial<Cypress.Loggable>) => {
  const o = wrapOptions(options)
  return cy.wrap(subject, o).then(subjectElement => {
    const ariaDescribedBy = subjectElement.attr('aria-describedby')
    if (ariaDescribedBy) {
      return cy.get(`[id="${ariaDescribedBy}"]`)
    } else {
      throw new Error(`The subject element does not have an aria-describedby attribute.`)
    }
  })
})

Cypress.Commands.add('shouldBeInvalid', { prevSubject: true }, (subject, options) => {
  const o = wrapOptions(options)
  return cy.wrap(subject, o).should('have.attr', 'aria-invalid', 'true')
})

Cypress.Commands.add('shouldBeValid', { prevSubject: true }, (subject, options) => {
  const o = wrapOptions(options)
  return cy.wrap(subject, o).should('not.have.attr', 'aria-invalid', 'true')
})

Cypress.Commands.add('getByLabelText', { prevSubject: 'optional' }, (subject, labelText: string, options) => {
  const o = wrapOptions(options)

  if (subject) {
    return cy
      .wrap(subject)
      .contains('label', labelText)
      .invoke('attr', 'for')
      .then(forAttributeValue => {
        cy.get(`input[id="${forAttributeValue}"], textarea[id="${forAttributeValue}"]`, o)
      })
  }

  return cy
    .contains('label', labelText)
    .invoke('attr', 'for')
    .then(forAttributeValue => {
      cy.get(`input[id="${forAttributeValue}"], textarea[id="${forAttributeValue}"]`, o)
    })
})

Cypress.Commands.add(
  'getByPlaceholder',
  {
    prevSubject: 'optional',
  },
  (subject, placeholder, options?: Partial<Cypress.Loggable>) => {
    const o = wrapOptions(options)

    const element = subject
      ? cy
          .wrap(subject, o)
          .find(`input[placeholder="${placeholder}"], textarea[placeholder="${placeholder}"]`, o)
          .waitForComponents(o)
      : cy.get(`input[placeholder="${placeholder}"], textarea[placeholder="${placeholder}"]`, o).waitForComponents(o)

    element.then(o, $el => log('getByPlaceholder', placeholder, $el, options))
    return element
  },
)

Cypress.Commands.add(
  'getByRole',
  {
    prevSubject: 'optional',
  },
  (subject, role, options) => {
    const o = wrapOptions(options)

    if (role === 'button') {
      const buttons = subject
        ? cy.wrap(subject, o).find('button, [role="button"]', o)
        : cy.get('button, [role="button"]', o)

      const visibleButtons = buttons.filter((_index, element) => {
        const isElementAriaHidden = options.hidden === true ? false : !!Cypress.$(element).attr('aria-hidden')
        return !isElementAriaHidden
      }, o)

      const labeledButtons = visibleButtons.filter((_index, element) => {
        if (options.name === undefined || options.name === null || options.name === '') {
          return true
        }
        const label = Cypress.$(element).attr('aria-label')
        const title = Cypress.$(element).attr('title')
        const text = Cypress.$(element).text().trim()
        return text === options.name.trim() || label === options.name.trim() || title === options.name.trim()
      }, o)

      const firstButton = labeledButtons.first(o).waitForComponents(o)

      firstButton.then(o, $el => log('getByRole', `button ${JSON.stringify(options)}`, $el, options))
      return firstButton
    }

    return subject ? cy.wrap(subject, o).waitForComponents(o) : cy.get(o).waitForComponents(o)
  },
)

Cypress.Commands.add(
  'getControl',
  {
    prevSubject: true,
  },
  (subject, labelText, options) => {
    const o = wrapOptions(options)

    const clearedLabelText = `${labelText || ''}`.trim()

    cy.wrap(subject, o)
      .invoke('attr', 'id')
      .then(id => cy.get(`button[aria-controls="${id}"]`))
      .filter((_index, element) => {
        if (clearedLabelText === '') {
          return true
        }

        const label = Cypress.$(element).attr('aria-label')
        const title = Cypress.$(element).attr('title')
        const text = Cypress.$(element).text().trim()

        return text === clearedLabelText || label === clearedLabelText || title === clearedLabelText
      })
  },
)
