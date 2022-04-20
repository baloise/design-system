import { isInput, isNumberInput, isSlider, isTextarea, selectors, wrapCommand, wrapOptions } from '../helpers'

Cypress.Commands.overwrite('type', (originalFn: any, element: any, content: any, options) => {
  const command = wrapCommand('type', element, content, $el => originalFn($el, content, wrapOptions(options)))

  if (isInput(element) || isNumberInput(element)) {
    return command(selectors.input.main)
  }

  if (isTextarea(element)) {
    return command(selectors.textarea.main)
  }

  if (isSlider(element)) {
    return cy
      .wrap(element, { log: false })
      .find(selectors.slider.main, { log: false })
      .invoke('val', parseFloat(content))
      .trigger('change', { log: false })
      .wrap(element, { log: false })
  }

  return originalFn(element, content, options)
})
