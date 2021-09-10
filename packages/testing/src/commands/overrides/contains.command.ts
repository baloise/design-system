import { isAccordion, isButton, isCheckbox, isInput, isRadio, isTag, selectors, wrapRoot } from '../helpers'

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

  if (isInput(element)) {
    return wrapRoot(element, selectors.input.main, $el => originalFn($el, content, options))
  }

  if (isRadio(element)) {
    return wrapRoot(element, selectors.radio.text, $el => originalFn($el, content, options))
  }

  if (isTag(element)) {
    return wrapRoot(element, selectors.tag.text, $el => originalFn($el, content, options))
  }

  return originalFn(element, content, options)
})
