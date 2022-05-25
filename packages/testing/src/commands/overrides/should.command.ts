import {
  selectors,
  isCheckbox,
  isDatepicker,
  isAccordion,
  isButton,
  isInput,
  isRadio,
  isSelect,
  isTabs,
  hasClass,
  isSlider,
  isLabel,
  isTextarea,
  isNumberInput,
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
      return originalFn(element.find(selectors.accordion.button, { log: false }), condition, key, value, options)
    }
  }

  if (isButton(element)) {
    if (['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused'].includes(condition)) {
      return originalFn(element.find(selectors.button.main, { log: false }), condition, key, value, options)
    }
  }

  if (
    isCheckbox(element) ||
    isRadio(element) ||
    hasClass(element, 'data-test-radio-label') ||
    hasClass(element, 'data-test-checkbox-label')
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

  if (isDatepicker(element)) {
    switch (condition) {
      case 'have.focus':
      case 'not.have.focus':
      case 'have.value':
      case 'not.have.value':
      case 'be.disabled':
      case 'not.be.disabled':
        return originalFn(element.find(selectors.datepicker.input, { log: false }), condition, key, value, options)
    }
  }

  if (isInput(element) || isNumberInput(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.input.main, { log: false }), condition, key, value, options)
    }
  }

  if (isTextarea(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.textarea.main, { log: false }), condition, key, value, options)
    }
  }

  if (isSlider(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.slider.main, { log: false }), condition, key, value, options)
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

  if (isTabs(element)) {
    switch (condition) {
      case 'have.value':
        return originalFn(element, 'have.attr', 'data-label', key, value)

      case 'not.have.value':
        return originalFn(element, 'not.have.attr', 'data-label', key, value)
    }
  }

  if (hasClass(element, selectors.tabs.tabItems.replace('li.', ''))) {
    switch (condition) {
      case 'have.value':
        return originalFn(element, 'have.attr', 'data-label', key, value)

      case 'not.have.value':
        return originalFn(element, 'not.have.attr', 'data-label', key, value)

      case 'be.disabled':
        return originalFn(element.find('a', { log: false }), 'have.attr', 'aria-disabled', 'true')

      case 'not.be.disabled':
        return originalFn(element.find('a', { log: false }), 'not.have.attr', 'aria-disabled', 'false')
    }
  }

  return originalFn(element, condition, key, value, options)
}

Cypress.Commands.overwrite('should', shouldAndAndCommand as any)
Cypress.Commands.overwrite('and', shouldAndAndCommand as any)
