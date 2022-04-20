import {
  selectors,
  isDatepicker,
  isCheckbox,
  isInput,
  isRadio,
  isSelect,
  isSlider,
  isTextarea,
  isNumberInput,
  wrapCommand,
  wrapOptions,
} from '../helpers'

Cypress.Commands.overwrite('clear', (originalFn, element: Cypress.Chainable<JQuery>, options) => {
  const command = wrapCommand('clear', element, '', $el => originalFn($el, wrapOptions(options)))

  if (isCheckbox(element)) {
    return command(selectors.checkbox.input)
  }

  if (isDatepicker(element)) {
    return command(selectors.datepicker.input)
  }

  if (isInput(element) || isNumberInput(element)) {
    return command(selectors.input.main)
  }

  if (isTextarea(element)) {
    return command(selectors.textarea.main)
  }

  if (isSlider(element)) {
    return command(selectors.slider.main)
  }

  if (isRadio(element)) {
    return command(selectors.radio.input)
  }

  if (isSelect(element)) {
    return cy
      .wrap(element)
      .then($el => ($el as any)[0].clear())
      .wrap(element)
  }

  return originalFn(element, options)
})
