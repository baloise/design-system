import {
  isAccordion,
  isButton,
  isNumberInput,
  isCardTitle,
  isCheckbox,
  isHeading,
  isInput,
  isRadio,
  isTag,
  isText,
  isTextarea,
  selectors,
  wrapRoot,
} from '../helpers'

Cypress.Commands.overwrite('contains', (originalFn, element: Cypress.Chainable<JQuery>, content, options) => {
  if (isAccordion(element)) {
    return wrapRoot(element, selectors.accordion.button, $el => originalFn($el, content, options))
  }

  if (isButton(element)) {
    return wrapRoot(element, selectors.button.label, $el => originalFn($el, content, options))
  }

  if (isCheckbox(element)) {
    return wrapRoot(element, selectors.checkbox.text, $el => originalFn($el, content, options))
  }

  if (isInput(element) || isNumberInput(element)) {
    return wrapRoot(element, selectors.input.main, $el => originalFn($el, content, options))
  }

  if (isTextarea(element)) {
    return wrapRoot(element, selectors.textarea.main, $el => originalFn($el, content, options))
  }

  if (isRadio(element)) {
    return wrapRoot(element, selectors.radio.text, $el => originalFn($el, content, options))
  }

  if (isTag(element)) {
    return wrapRoot(element, selectors.tag.text, $el => originalFn($el, content, options))
  }

  if (isHeading(element) || isCardTitle(element)) {
    return wrapRoot(element, selectors.heading.content, $el => originalFn($el, content, options))
  }

  if (isText(element)) {
    return wrapRoot(element, 'span', $el => originalFn($el, content, options))
  }

  return originalFn(element, content, options)
})
