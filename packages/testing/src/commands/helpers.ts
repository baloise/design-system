/**
 * Helper fn to identify the element/component
 */
type isElementType = (el: Cypress.Chainable<JQuery>) => boolean
const isElement = (el: Cypress.Chainable<JQuery>, name: string) => el[0].nodeName === name

export const isAccordion: isElementType = el => isElement(el, 'BAL-ACCORDION')
export const isButton: isElementType = el => isElement(el, 'BAL-BUTTON')
export const isCheckbox: isElementType = el => isElement(el, 'BAL-CHECKBOX')
export const isDatepicker: isElementType = el => isElement(el, 'BAL-DATEPICKER')

/**
 * Selectors
 */
export const selectors = {
  accordion: {
    button: '.data-test-accordion-trigger > button',
  },
  button: {
    main: 'button',
    label: 'bal-text.data-test-button-label',
  },
  checkbox: {
    input: 'input.data-test-checkbox-input',
    label: 'label.data-test-checkbox-label',
    text: 'label.data-test-checkbox-label > bal-text',
  },
  datepicker: {
    input: 'input.data-test-input',
  },
}

/**
 * Executes a command on a child element and wraps back to the main element/component
 */
export const wrapRoot = <E = unknown>(
  element: E,
  selector: string,
  fn: ($el: any) => Cypress.Chainable<JQuery> | void,
) => {
  return cy
    .wrap(element)
    .find(selector)
    .then($el => fn($el))
    .wrap(element)
}
