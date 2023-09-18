import {
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
  isInputDate,
} from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.overwrite<any, any>('clear', (originalFn: any, element: Cypress.Chainable<JQuery>, options) => {
  const command = wrapCommand('clear', element, '', $el => originalFn($el, wrapOptions(options)))

  if (isCheckbox(element)) {
    return command(selectors.checkbox.input)
  }

  if (isDatepicker(element)) {
    return command(selectors.datepicker.input)
  }

  if (isInput(element)) {
    return command(selectors.input.native)
  }

  if (isInputDate(element)) {
    return command(selectors.dateInput.native)
  }

  if (isNumberInput(element)) {
    return command(selectors.numberInput.native)
  }

  if (isTextarea(element)) {
    return command(selectors.textarea.native)
  }

  if (isSlider(element)) {
    return command(selectors.slider.native)
  }

  if (isRadio(element)) {
    return command(selectors.radio.input)
  }

  if (isSelect(element)) {
    return command('.bal-select__control__input')
  }

  return originalFn(element, options)
})
