import { selectors } from '../../selectors'
import { isCheckbox, isRadio, wrapCommand, wrapOptions } from '../helpers'

Cypress.Commands.overwrite('check', (originalFn: any, element: any, options) => {
  const command = wrapCommand('check', element, '', $el => originalFn($el, wrapOptions(options)))

  if (isCheckbox(element)) {
    return command(selectors.checkbox.input)
  }

  if (isRadio(element)) {
    return command(selectors.radio.input)
  }

  return originalFn(element, options)
})
