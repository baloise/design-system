import { isDatepicker, isInput, isSlider, isTextarea, selectors, wrapRoot } from '../helpers'

Cypress.Commands.overwrite('type', (originalFn, element: Cypress.Chainable<JQuery>, content, options) => {
  if (isDatepicker(element)) {
    return wrapRoot(element, selectors.datepicker.input, $el => originalFn($el, content, options))
  }

  if (isInput(element)) {
    return wrapRoot(element, selectors.input.main, $el => originalFn($el, content, options))
  }

  if (isTextarea(element)) {
    return wrapRoot(element, selectors.textarea.main, $el => originalFn($el, content, options))
  }

  if (isSlider(element)) {
    return cy
      .wrap(element)
      .find(selectors.slider.main)
      .invoke('val', parseFloat(content))
      .trigger('change')
      .wrap(element)
  }

  return originalFn(element, content, options)
})
