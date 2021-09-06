import {
  isAccordion,
  isButton,
  isCheckbox,
  isDatepicker,
  isInput,
  isRadio,
  isSelect,
  selectors,
  wrapRoot,
} from '../helpers'

Cypress.Commands.overwrite('focus', (originalFn, element: Cypress.Chainable<JQuery>, options) => {
  if (isAccordion(element)) {
    return wrapRoot(element, selectors.accordion.button, $el => originalFn($el, options))
  }

  if (isButton(element)) {
    return wrapRoot(element, selectors.button.main, $el => originalFn($el, options))
  }

  if (isCheckbox(element)) {
    return wrapRoot(element, selectors.checkbox.input, $el => originalFn($el, options))
  }

  if (isDatepicker(element)) {
    return wrapRoot(element, selectors.datepicker.input, $el => originalFn($el, options))
  }

  if (isInput(element)) {
    return wrapRoot(element, selectors.input.main, $el => originalFn($el, options))
  }

  if (isRadio(element)) {
    return wrapRoot(element, selectors.radio.input, $el => originalFn($el, options))
  }

  if (isSelect(element)) {
    return wrapRoot(element, selectors.select.input, $el => originalFn($el, options))
  }

  return originalFn(element, options)
})
