import { parseDataTestID, selectors } from '../../selectors/index'
import {
  hasClass,
  hasRole,
  hasTestId,
  isAccordion,
  isButton,
  isCheckbox,
  isDropDown,
  isInput,
  isInputDate,
  isInputStepper,
  isLabel,
  isNumberInput,
  isRadio,
  isSelect,
  isSlider,
  isSteps,
  isTabs,
  isTextarea,
} from '../helpers'

const shouldAndAndCommand = (
  originalFn: any,
  element: Cypress.Chainable<JQuery>,
  condition: string,
  key: any,
  value: any,
  options: any,
) => {
  if (isAccordion(element)) {
    if (['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused'].includes(condition)) {
      return originalFn(element.find(selectors.accordion.trigger, { log: false }), condition, key, value, options)
    }
  }

  if (isButton(element)) {
    if (['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused'].includes(condition)) {
      return originalFn(element.find(selectors.button.native, { log: false }), condition, key, value, options)
    }
  }

  if (
    isCheckbox(element) ||
    isRadio(element) ||
    hasClass(element, 'bal-checkbox__label') ||
    hasRole(element, 'radiogroup') ||
    hasRole(element, 'group')
  ) {
    if (isLabel(element)) {
      element = element.closest(isCheckbox(element) ? '<bal-checkbox>' : '<bal-radio>', { log: false })
    }

    if ('be.checked' === condition) {
      return originalFn(element, 'have.attr', 'aria-checked', 'true', options)
    }

    if ('not.be.checked' === condition) {
      return originalFn(element, 'have.attr', 'aria-checked', 'false', options)
    }

    if ('be.disabled' === condition) {
      return originalFn(element, 'have.attr', 'aria-disabled', 'true', options)
    }

    if ('not.be.disabled' === condition) {
      return originalFn(element, 'not.have.attr', 'aria-disabled', options)
    }

    if ('be.focused' === condition) {
      return originalFn(element, 'have.attr', 'aria-focused', 'true', options)
    }

    if ('not.be.focused' === condition) {
      return originalFn(element, 'not.have.attr', 'aria-focused', options)
    }
  }

  if (isInputStepper(element)) {
    if ('be.disabled' === condition) {
      return originalFn(element, 'have.attr', 'aria-disabled', 'true', options)
    }

    if ('not.be.disabled' === condition) {
      return originalFn(element, 'not.have.attr', 'aria-disabled', options)
    }

    if ('be.focused' === condition) {
      return originalFn(element.find('input'), condition, key, value, options)
    }

    if ('not.be.focused' === condition) {
      return originalFn(element.find('input'), condition, key, value, options)
    }

    if ('have.value' === condition) {
      return originalFn(element.find('input'), condition, key, value, options)
    }

    if ('not.have.value' === condition) {
      return originalFn(element.find('input'), condition, key, value, options)
    }
  }

  if (isInput(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.input.native, { log: false }), condition, key, value, options)
    }
  }

  if (isInputDate(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(Cypress.$((element as any)[0]).find(selectors.dateInput.native), condition, key, value, options)
    }
  }

  if (isNumberInput(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.numberInput.native, { log: false }), condition, key, value, options)
    }
  }

  if (isTextarea(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.textarea.native, { log: false }), condition, key, value, options)
    }
  }

  if (isSlider(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.slider.native, { log: false }), condition, key, value, options)
    }
  }

  if (isSelect(element)) {
    switch (condition) {
      case 'have.focus':
      case 'not.have.focus':
      case 'be.disabled':
      case 'not.be.disabled':
        return originalFn(element.find(selectors.select.input, { log: false }), condition, key, value, options)

      case 'have.value':
        if (typeof key === 'string') {
          return originalFn(element.find(selectors.select.input, { log: false }), condition, key, value, options)
        }
        return originalFn(element, 'have.attr', 'data-value', key.join(','), value)

      case 'not.have.value':
        if (typeof key === 'string') {
          return originalFn(element.find(selectors.select.input, { log: false }), condition, key, value, options)
        }
        return originalFn(element, 'not.have.attr', 'data-value', key.join(','), value)
    }
  }

  if (hasClass(element, 'bal-dropdown__root__input')) {
    const parseKey = () => {
      return typeof key === 'string'
        ? key
        : (key as string[])
            .map(k => k.trim())
            .sort()
            .join(',')
    }

    switch (condition) {
      case 'have.value':
        return originalFn(element, 'have.attr', 'data-label', parseKey(), value)

      case 'not.have.value':
        return originalFn(element, 'not.have.attr', 'data-label', parseKey(), value)
    }
  }

  if (isDropDown(element)) {
    const nativeEl = element.find(selectors.dropdown.input, { log: false })
    const parseKey = () => {
      return typeof key === 'string'
        ? key
        : (key as string[])
            .map(k => k.trim())
            .sort()
            .join(',')
    }

    switch (condition) {
      case 'have.focus':
      case 'not.have.focus':
      case 'be.disabled':
      case 'not.be.disabled':
        return originalFn(nativeEl, condition, key, value, options)

      case 'have.value':
        return originalFn(nativeEl, 'have.attr', 'data-label', parseKey(), value)

      case 'not.have.value':
        return originalFn(nativeEl, 'not.have.attr', 'data-label', parseKey(), value)
    }
  }

  if (isTabs(element)) {
    switch (condition) {
      case 'have.value':
        return originalFn(element, 'have.attr', 'data-label', key, value)

      case 'not.have.value':
        return originalFn(element, 'not.have.attr', 'data-label', key, value)
    }
  }

  if (hasTestId(element, parseDataTestID(selectors.tabs.item))) {
    switch (condition) {
      case 'have.value':
        return originalFn(element, 'have.attr', 'data-label', key, value)

      case 'not.have.value':
        return originalFn(element, 'not.have.attr', 'data-label', key, value)

      case 'be.disabled':
        return originalFn(element, 'have.attr', 'aria-disabled', 'true')

      case 'not.be.disabled':
        return originalFn(element, 'not.have.attr', 'aria-disabled', 'false')
    }
  }

  if (isSteps(element)) {
    switch (condition) {
      case 'have.value':
        return originalFn(element, 'have.attr', 'data-label', key, value)

      case 'not.have.value':
        return originalFn(element, 'not.have.attr', 'data-label', key, value)
    }
  }

  if (hasTestId(element, parseDataTestID(selectors.steps.option))) {
    switch (condition) {
      case 'have.value':
        return originalFn(element, 'have.attr', 'data-label', key, value)

      case 'not.have.value':
        return originalFn(element, 'not.have.attr', 'data-label', key, value)

      case 'be.disabled':
        return originalFn(element, 'have.attr', 'aria-disabled', 'true')

      case 'not.be.disabled':
        return originalFn(element, 'not.have.attr', 'aria-disabled', 'false')
    }
  }

  return originalFn(element, condition, key, value, options)
}

Cypress.Commands.overwrite('should', shouldAndAndCommand as any)
Cypress.Commands.overwrite('and', shouldAndAndCommand as any)
