/**
 * Helper fn to identify the element/component
 */
type isElementType = (el: Cypress.Chainable<JQuery>) => boolean
const isElement = (el: Cypress.Chainable<JQuery>, name: string) => (el as any)[0].nodeName === name
export const hasClass = (el: Cypress.Chainable<JQuery>, name: string) => {
  return (el as unknown as JQuery).hasClass(name)
}

export const isAccordion: isElementType = el => isElement(el, 'BAL-ACCORDION')
export const isButton: isElementType = el => isElement(el, 'BAL-BUTTON')
export const isCheckbox: isElementType = el => isElement(el, 'BAL-CHECKBOX')
export const isDatepicker: isElementType = el => isElement(el, 'BAL-DATEPICKER')
export const isInput: isElementType = el => isElement(el, 'BAL-INPUT')
export const isModal: isElementType = el => isElement(el, 'BAL-MODAL')
export const isRadioGroup: isElementType = el => isElement(el, 'BAL-RADIO-GROUP')
export const isRadio: isElementType = el => isElement(el, 'BAL-RADIO')
export const isSelect: isElementType = el => isElement(el, 'BAL-SELECT')
export const isTag: isElementType = el => isElement(el, 'BAL-TAG')
export const isTabs: isElementType = el => isElement(el, 'BAL-TABS')
export const isSlider: isElementType = el => isElement(el, 'BAL-SLIDER')
export const isHint: isElementType = el => isElement(el, 'BAL-HINT')

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
  dropdown: {
    trigger: 'bal-dropdown-trigger',
    menu: 'bal-dropdown-menu',
  },
  input: {
    main: '> input',
  },
  slider: {
    main: 'input.slider',
  },
  modal: {
    main: 'div.modal',
  },
  tag: {
    text: 'bal-text',
  },
  radio: {
    input: 'input.data-test-radio-input',
    label: 'label.data-test-radio-label',
    text: 'label.data-test-radio-label > bal-text',
  },
  select: {
    input: 'input.data-test-select-input',
    options: 'button.bal-select__option',
    chips: '.bal-select__selections > bal-tag',
  },
  tabs: {
    tabItems: 'li.data-test-tab-item',
    action: '.data-test-tabs-action',
  },
  toast: {
    main: '.bal-notices > bal-toast',
  },
  snackbar: {
    main: '.bal-notices > bal-snackbar',
  },
  pagination: {
    next: 'button.pagination-next',
    previous: 'button.pagination-previous',
    pages: '.pagination-list > li > a',
  },
  hint: {
    trigger: '.data-test-hint-trigger',
    content: '.data-test-hint-content',
    close: '.data-test-hint-close',
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
