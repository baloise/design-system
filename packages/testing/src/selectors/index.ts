import { byTestId } from './selectors.util'
export { byTestId, dataTestSelector, parseDataTestID } from './selectors.util'

/**
 * Selectors
 */
export const selectors = {
  accordion: {
    /**
     * The trigger button, which shows and hides the content / details.
     */
    trigger: byTestId('bal-accordion-trigger'),
    /**
     * The content or the hidden part of the accordion.
     */
    details: byTestId('bal-accordion-details'),
    /**
     * The header or visible part of the accordion
     */
    summary: byTestId('bal-accordion-summary'),
  },
  badge: {
    /**
     * Badge label.
     */
    label: byTestId('bal-badge-label'),
  },
  button: {
    /**
     * Native button element.
     */
    native: byTestId('bal-button'),
    /**
     * Button label.
     */
    label: byTestId('bal-button-label'),
  },
  carousel: {
    /**
     * Pagination left control.
     */
    paginationPrevious: byTestId('bal-pagination-controls-left'),
    /**
     * Pagination right control.
     */
    paginationNext: byTestId('bal-pagination-controls-right'),
    /**
     * Carousel right control.
     */
    carouselControlPrevious: byTestId('bal-carousel-control-left'),
    /**
     * Carousel left control.
     */
    carouselControlNext: byTestId('bal-carousel-control-right'),
  },
  close: {
    /**
     * The trigger button.
     */
    button: byTestId('bal-close'),
  },
  data: {
    /**
     * Editable button.
     */
    editable: byTestId('bal-data-value-button'),
  },
  footer: {
    /**
     * Language select element.
     */
    language: byTestId('bal-footer-language"'),
  },
  heading: {
    /**
     * Native h1 element.
     */
    native: byTestId('bal-heading'),
  },
  notification: {
    /**
     * Notification content element.
     */
    content: byTestId('bal-notification-content'),
  },
  pagination: {
    /**
     * Pagination left control.
     */
    previous: byTestId('bal-pagination-controls-left'),
    /**
     * Pagination right control.
     */
    next: byTestId('bal-pagination-controls-right'),
    /**
     * Pagination ul list.
     */
    list: byTestId('bal-pagination-list'),
    /**
     * The number of the page.
     */
    pageNumber: byTestId('bal-pagination-page-number'),
    /**
     * bal-button of the number of the page..
     */
    pages: '.bal-pagination__nav__pagination-list > li > bal-button',
    /**
     * The native button of the number of the page.
     */
    button: '.bal-pagination__nav__pagination-list > li > bal-button > button',
  },
  tag: {
    /**
     * Tag label..
     */
    label: byTestId('bal-tag-label'),
    /**
     * Close button.
     */
    close: byTestId('bal-tag-close'),
  },
  text: {
    /**
     * Native p element.
     */
    native: byTestId('bal-text'),
  },
  checkbox: {
    /**
     * Native input element.
     */
    input: byTestId('bal-checkbox-input'),
    /**
     * Label element.
     */
    label: byTestId('bal-checkbox-label'),
    /**
     * Label span element.
     */
    text: byTestId('bal-checkbox-text'),
  },
  datepicker: {
    /**
     * Native input element.
     */
    input: byTestId('bal-datepicker-input'),
  },
  field: {
    /**
     * Hint element.
     */
    hint: byTestId('bal-field-hint'),
  },
  fileUpload: {
    /**
     * Native input element.
     */
    input: byTestId('bal-file-upload-input'),
    /**
     * Native span element.
     */
    label: byTestId('bal-file-upload-label'),
  },
  slider: {
    /**
     * Native input element.
     */
    native: byTestId('bal-input-slider'),
  },
  inputStepper: {
    /**
     * Decrease button.
     */
    decrease: byTestId('bal-input-stepper-decrease'),
    /**
     * Increase button.
     */
    increase: byTestId('bal-input-stepper-increase'),
    /**
     * Native input element.
     */
    native: byTestId('bal-input-stepper'),
    /**
     * Text element.
     */
    text: byTestId('bal-input-stepper-text'),
  },
  input: {
    /**
     * Native input element.
     */
    native: byTestId('bal-input'),
  },
  dateInput: {
    /**
     * Native input element.
     */
    native: byTestId('bal-date-input'),
  },
  numberInput: {
    /**
     * Native input element.
     */
    native: byTestId('bal-number-input'),
  },
  radio: {
    /**
     * Native input element.
     */
    input: byTestId('bal-radio-input'),
    /**
     * Native label element.
     */
    label: byTestId('bal-radio-label'),
    /**
     * Native span element.
     */
    text: byTestId('bal-radio-text'),
  },
  select: {
    /**
     * Native input element.
     */
    input: 'input.data-test-select-input',
    /**
     * Select option.
     */
    options: 'button.bal-select__option',
    /**
     * Multi select tag .
     */
    chips: byTestId('bal-select-chip'),
  },
  popover: {
    /**
     * Popover trigger.
     */
    trigger: 'bal-popover-trigger',
    /**
     * Popover content element.
     */
    content: byTestId('bal-popover-content'),
  },
  textarea: {
    /**
     * Native input element.
     */
    native: byTestId('bal-textarea-input'),
  },
  modal: {
    /**
     * Modal element.
     */
    main: 'div.modal',
  },
  steps: {
    /**
     * Step option
     */
    option: byTestId('bal-steps-option'),
    /**
     * Step option label
     */
    optionLabel: byTestId('bal-steps-option-label'),
  },
  tabs: {
    /**
     * Tab item.
     */
    item: byTestId('bal-tabs-item'),
    /**
     * Tab item label.
     */
    itemLabel: byTestId('bal-tabs-item-label'),
  },
  toast: {
    /**
     * Toast element.
     */
    main: '.bal-notices > .bal-toast',
    /**
     * Toast label element.
     */
    label: byTestId('bal-toast-label'),
    /**
     * Toast close element.
     */
    close: byTestId('bal-toast-close'),
  },
  snackbar: {
    /**
     * Snackbar element.
     */
    main: '.bal-notices > .bal-snackbar',
    /**
     * Snackbar heading element.
     */
    heading: byTestId('bal-snackbar-heading'),
    /**
     * Snackbar label element.
     */
    label: byTestId('bal-snackbar-label'),
    /**
     * Snackbar close element.
     */
    close: byTestId('bal-snackbar-close'),
    /**
     * Snackbar action element.
     */
    action: byTestId('bal-snackbar-action'),
  },
  hint: {
    /**
     * Hint trigger element.
     */
    trigger: byTestId('bal-hint-trigger'),
    /**
     * Hint content element.
     */
    content: byTestId('bal-hint-content'),
    /**
     * Hint close element.
     */
    close: byTestId('bal-hint-close'),
  },
}
