import { selectors } from '../../selectors'
import {
  isAccordion,
  isButton,
  isCheckbox,
  isDatepicker,
  isInput,
  isRadio,
  isSelect,
  isSlider,
  isTextarea,
  isNumberInput,
  wrapOptions,
  wrapCommand,
  isInputDate,
  wrapShadowCommand,
} from '../helpers'

Cypress.Commands.overwrite<any, any>('blur', (originalFn: any, element: Cypress.Chainable<JQuery>, options) => {
  const command = wrapCommand('blur', element, '', $el => originalFn($el, wrapOptions(options)))
  const commandShadow = wrapShadowCommand('blur', element, '', $el =>
    originalFn($el, wrapOptions({ ...options, force: true })),
  )

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
    return commandShadow(selectors.input.native)
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
