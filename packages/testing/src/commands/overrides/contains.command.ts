import { hasClass } from './../helpers'
import {
  isNumberInput,
  isCheckbox,
  isInput,
  isRadio,
  isTag,
  isTextarea,
  isModal,
  selectors,
  wrapCommand,
  wrapOptions,
} from '../helpers'

Cypress.Commands.overwrite('contains', (originalFn: any, element: any, content, options) => {
  const command = wrapCommand('contains', element, content, $el => originalFn($el, content, wrapOptions(options)))

  if (isCheckbox(element)) {
    return command(selectors.checkbox.text)
  }

  if (isInput(element) || isNumberInput(element)) {
    return command(selectors.input.main)
  }

  if (isTextarea(element)) {
    return command(selectors.textarea.main)
  }

  if (isRadio(element)) {
    return command(selectors.radio.text)
  }

  if (isTag(element)) {
    return command(selectors.tag.text)
  }

  if (isModal(element)) {
    return command('.bal-modal__content')
  }

  if (hasClass(element, 'bal-tabs__steps__item')) {
    return command(element.find('.bal-tabs__steps__item__button__label'))
  }

  return originalFn(element, content, options)
})
