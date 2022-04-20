import {
  selectors,
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
} from '../helpers'

Cypress.Commands.overwrite<any, any>('blur', (originalFn: any, element: Cypress.Chainable<JQuery>, options) => {
  const command = wrapCommand('blur', element, '', _ => originalFn(element, wrapOptions(options)))

  if (isAccordion(element)) {
    return command(selectors.accordion.button)
  }

  if (isButton(element)) {
    return command(selectors.button.main)
  }

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
    return command(selectors.select.input)
  }

  return originalFn(element, options)
})
