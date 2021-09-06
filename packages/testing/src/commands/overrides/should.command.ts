/// <reference types="cypress" />

import { selectors, isCheckbox, isDatepicker, isAccordion, isButton } from '../helpers'

Cypress.Commands.overwrite(
  'should',
  (originalFn, element: Cypress.Chainable<JQuery>, condition, key, value, options) => {
    if (isAccordion(element)) {
      if (['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused'].includes(condition)) {
        return originalFn(element.find(selectors.accordion.button), condition, key, value, options)
      }
    }

    if (isButton(element)) {
      if (['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused'].includes(condition)) {
        return originalFn(element.find(selectors.button.main), condition, key, value, options)
      }
    }

    if (isCheckbox(element)) {
      if ('be.checked' === condition) {
        return originalFn(element, 'have.attr', 'checked', 'checked', options)
      }
      if ('not.be.checked' === condition) {
        return originalFn(element, 'not.have.attr', 'checked', options)
      }
      if ('be.disabled' === condition) {
        return originalFn(element, 'have.class', 'is-disabled', options)
      }
      if ('not.be.disabled' === condition) {
        return originalFn(element, 'not.have.class', 'is-disabled', options)
      }

      if ('be.focused' === condition) {
        return originalFn(element, 'have.class', 'is-focused', options)
      }
      if ('not.be.focused' === condition) {
        return originalFn(element, 'not.have.class', 'is-focused', options)
      }
    }

    if (isDatepicker) {
      switch (condition) {
        case 'have.focus':
        case 'not.have.focus':
        case 'have.value':
        case 'not.have.value':
        case 'be.disabled':
        case 'not.be.disabled':
          return originalFn(element.find(selectors.datepicker.input), condition, key, value, options)
      }
    }

    return originalFn(element, condition, key, value, options)
  },
)
