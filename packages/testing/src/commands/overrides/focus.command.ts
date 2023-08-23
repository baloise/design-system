import {
  isAccordion,
  isButton,
  isCheckbox,
  isDatepicker,
  isInput,
  isInputDate,
  isNumberInput,
  isRadio,
  isSelect,
  isSlider,
  isTextarea,
  wrapCommand,
  wrapOptions,
} from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.overwrite<any, any>('focus', (originalFn: any, element: Cypress.Chainable<JQuery>, options) => {
  const command = wrapCommand('focus', element, '', $el => originalFn($el, wrapOptions(options)))

  if (isAccordion(element)) {
    return command(selectors.accordion.trigger)
  }

  if (isButton(element)) {
    return command(selectors.button.native)
  }

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
    return command(selectors.select.input)
  }

  return originalFn(element, options)
})
