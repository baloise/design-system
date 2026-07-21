import {
  isAccordion,
  isButton,
  isCheckbox,
  isRadio,
  isTag,
  hasClass,
  isHint,
  wrapCommand,
  wrapOptions,
  isDropDown,
  log,
} from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.overwrite<any, any>('click', (originalFn: any, element: Cypress.Chainable<JQuery>, options) => {
  const command = (selector: string) => {
    return cy
      .wrapComponent(element as any, { log: false })
      .waitForComponents({ log: false })
      .find(selector, { log: false })
      .click({ force: true, log: false })
      .then($el => log('click', '', $el))
      .wrapComponent(element as any, { log: false })
  }

  if (isAccordion(element)) {
    return command(selectors.accordion.trigger)
  }

  if (isButton(element)) {
    return command(selectors.button.native)
  }

  if (isCheckbox(element)) {
    return command(selectors.checkbox.label)
  }

  if (isRadio(element)) {
    return command(selectors.radio.label)
  }

  if (isTag(element)) {
    return command(selectors.tag.close)
  }

  if (isHint(element)) {
    return command(selectors.hint.trigger)
  }

  if (isDropDown(element)) {
    return command(selectors.dropdown.trigger)
  }

  return originalFn(element, options)
})
