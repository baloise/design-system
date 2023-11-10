import { isInput, isInputDate, isNumberInput, isSlider, isTextarea, wrapCommand, wrapOptions } from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.overwrite('type', (originalFn: any, element: any, content: any, options) => {
  const command = wrapCommand('type', element, content, $el => originalFn($el, content, wrapOptions(options)))

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
    return cy
      .wrap(element, { log: false })
      .find(selectors.slider.native, { log: false })
      .invoke('val', parseFloat(content))
      .trigger('change', { log: false })
      .wrap(element, { log: false })
  }

  return originalFn(element, content, options)
})
