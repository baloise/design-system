/// <reference types="cypress" />

import '@baloise/design-system-testing/src/add-custom-commands'
// import { checkAriaLabel, log, wrapOptions } from './helpers'

declare global {
  namespace Cypress {
    // interface GetByRoleOptions {
    //   name?: string
    //   hidden?: boolean
    // }

    interface Chainable {
      // getControl(labelText: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      // getDescribingElement(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      // shouldBeInvalid(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      // shouldBeValid(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
      // getByLabelText(
      //   labelText: string,
      //   options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      // ): Chainable<void>
      // getByPlaceholder(
      //   placeholder: string,
      //   options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      // ): Chainable<JQuery>
      // getByRole(
      //   role: 'button' | 'label',
      //   options: GetByRoleOptions & Partial<Loggable & Timeoutable & Withinable & Shadow>,
      // ): Chainable<JQuery>
    }
  }
}

// Cypress.Commands.add('getDescribingElement', { prevSubject: true }, (subject, options?: Partial<Cypress.Loggable>) => {
//   const o = wrapOptions(options)
//   return cy.wrap(subject, o).then(subjectElement => {
//     const ariaDescribedBy = subjectElement.attr('aria-describedby')
//     if (ariaDescribedBy) {
//       return cy
//         .get(`[id="${ariaDescribedBy}"]`, o)
//         .then(o, $el => log('-getDescribingElement', ariaDescribedBy, $el, options))
//     } else {
//       throw new Error(`The subject element does not have an aria-describedby attribute.`)
//     }
//   })
// })

// Cypress.Commands.add('shouldBeInvalid', { prevSubject: true }, (subject, options) => {
//   const o = wrapOptions(options)
//   return cy.wrap(subject, o).should('have.attr', 'aria-invalid', 'true')
// })

// Cypress.Commands.add('shouldBeValid', { prevSubject: true }, (subject, options) => {
//   const o = wrapOptions(options)
//   return cy.wrap(subject, o).should('not.have.attr', 'aria-invalid', 'true')
// })

// Cypress.Commands.add('getByLabelText', { prevSubject: 'optional' }, (subject, labelText: string, options) => {
//   const o = wrapOptions(options)

//   if (subject) {
//     return cy
//       .wrap(subject, o)
//       .contains('label', labelText, o)
//       .invoke(o, 'attr', 'for')
//       .then(forAttributeValue => {
//         return cy.get(`input[id="${forAttributeValue}"], textarea[id="${forAttributeValue}"]`, o)
//       })
//       .then(o, $el => log(!!subject ? '-getByLabelText' : 'getByLabelText', labelText, $el, options))
//   }

//   return cy
//     .contains('label', labelText, o)
//     .invoke(o, 'attr', 'for')
//     .then(forAttributeValue => {
//       return cy.get(`input[id="${forAttributeValue}"], textarea[id="${forAttributeValue}"]`, o)
//     })
//     .then(o, $el => log(!!subject ? '-getByLabelText' : 'getByLabelText', labelText, $el, options))
// })

// Cypress.Commands.add(
//   'getByPlaceholder',
//   {
//     prevSubject: 'optional',
//   },
//   (subject, placeholder, options?: Partial<Cypress.Loggable>) => {
//     const o = wrapOptions(options)

//     const element = subject
//       ? cy
//           .wrap(subject, o)
//           .find(`input[placeholder="${placeholder}"], textarea[placeholder="${placeholder}"]`, o)
//           .waitForComponents(o)
//       : cy.get(`input[placeholder="${placeholder}"], textarea[placeholder="${placeholder}"]`, o).waitForComponents(o)

//     element.then(o, $el => log(!!subject ? '-getByPlaceholder' : 'getByPlaceholder', placeholder, $el, options))
//     return element
//   },
// )

// Cypress.Commands.add(
//   'getByRole',
//   {
//     prevSubject: 'optional',
//   },
//   (subject, role, options) => {
//     const o = wrapOptions(options)

//     function findElements() {
//       return subject ? cy.wrap(subject, o).find(`${role}, [role="${role}"]`, o) : cy.get(`${role}, [role="${role}"]`, o)
//     }

//     function filterVisibleElements(elements) {
//       return elements.filter((_index, element) => {
//         const isElementAriaHidden = options.hidden === true ? false : !!Cypress.$(element).attr('aria-hidden')
//         return !isElementAriaHidden
//       }, o)
//     }

//     function filterLabeling(elements) {
//       return elements.filter((_index, element) => checkAriaLabel(element, options.name), o)
//     }

//     const elements = findElements()
//     const visibleElements = filterVisibleElements(elements)
//     const labeledElements = filterLabeling(visibleElements)
//     const firstElement = labeledElements.first(o).waitForComponents(o)
//     firstElement.then(o, $el =>
//       log(!!subject ? '-getByRole' : 'getByRole', `${role} ${JSON.stringify(options)}`, $el, options),
//     )
//     return firstElement
//   },
// )

// Cypress.Commands.add(
//   'getControl',
//   {
//     prevSubject: true,
//   },
//   (subject, labelText, options) => {
//     const o = wrapOptions(options)

//     const clearedLabelText = `${labelText || ''}`.trim()

//     return cy
//       .wrap(subject, o)
//       .invoke(o, 'attr', 'id')
//       .then(id => cy.get(`button[aria-controls="${id}"]`, o))
//       .filter((_index, element) => checkAriaLabel(element, clearedLabelText), o)
//       .then(o, $el => log('-getControl', `${labelText}`, $el, options))
//   },
// )
