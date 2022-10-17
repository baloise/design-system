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

Cypress.Commands.overwrite<any, any>('clear', (originalFn: any, element: Cypress.Chainable<JQuery>, options) => {
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
    return command('.bal-select__control__input')
  }

  return originalFn(element, options)
})
