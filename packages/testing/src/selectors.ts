// @deprecated standard ist data-testid instead of data-test-id
export const dataTestSelector = (testId: string): string => `[data-test-id="${testId}"]`

export const byTestId = (testId: string): string => `[data-testid="${testId}"]`

export const parseDataTestID = (testId: string): string => {
  return testId.slice(0, -2).slice(14).trim()
}

/**
 * Selectors
 */
export const selectors = {
  accordion: {
    button: byTestId('bal-accordion-button'),
    content: byTestId('bal-accordion-content'),
  },
  steps: {
    option: byTestId('bal-steps-option'),
    optionLabel: byTestId('bal-steps-option-label'),
  },
  field: {
    hint: 'bal-field-hint > bal-hint',
  },
  button: {
    main: 'button',
    label: '.data-test-button-label',
  },
  checkbox: {
    input: 'input.data-test-checkbox-input',
    label: 'label.data-test-checkbox-label',
    text: 'label.data-test-checkbox-label > span',
  },
  datepicker: {
    input: 'input.data-test-input',
  },
  popover: {
    trigger: 'bal-popover-trigger',
    content: 'bal-popover-content',
  },
  input: {
    main: 'input',
  },
  textarea: {
    main: '> textarea',
  },
  slider: {
    main: 'input',
  },
  modal: {
    main: 'div.modal',
  },
  tag: {
    text: '.bal-tag__label',
  },
  card: {
    title: 'bal-heading',
  },
  radio: {
    input: 'input.data-test-radio-input',
    label: 'label.data-test-radio-label',
    text: 'label.data-test-radio-label > span',
  },
  select: {
    input: 'input.data-test-select-input',
    options: 'button.bal-select__option',
    chips: '.bal-select__control__selections > .bal-tag',
  },
  tabs: {
    tabItems: 'li.data-test-tab-item',
    action: '.data-test-tabs-action',
  },
  toast: {
    main: '.bal-notices > .bal-toast',
  },
  snackbar: {
    main: '.bal-notices > .bal-snackbar',
  },
  pagination: {
    next: '.bal-pagination__nav__pagination-next',
    previous: '.bal-pagination__nav__pagination-previous',
    pages: '.bal-pagination__nav__pagination-list > li > bal-button',
    button: '.bal-pagination__nav__pagination-list > li > bal-button > button',
  },
  hint: {
    trigger: '.data-test-hint-trigger',
    content: '.data-test-hint-content',
    close: '.data-test-hint-close',
  },
}
