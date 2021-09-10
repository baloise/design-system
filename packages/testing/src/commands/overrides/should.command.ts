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
      return originalFn(element.find(selectors.accordion.button), condition, key, value, options)
    }
  }

  if (isButton(element)) {
    if (['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused'].includes(condition)) {
      return originalFn(element.find(selectors.button.main), condition, key, value, options)
    }
  }

  if (isCheckbox(element) || isRadio(element)) {
    if ('be.checked' === condition) {
      return originalFn(element.find('label'), 'have.attr', 'aria-checked', 'true', options)
    }

    if ('not.be.checked' === condition) {
      return originalFn(element.find('label'), 'have.attr', 'aria-checked', 'false', options)
    }

    if ('be.disabled' === condition) {
      return originalFn(element.find('label'), 'have.attr', 'aria-disabled', 'true', options)
    }

    if ('not.be.disabled' === condition) {
      return originalFn(element.find('label'), 'have.attr', 'aria-disabled', 'false', options)
    }

    if ('be.focused' === condition) {
      return originalFn(element.find('label'), 'have.attr', 'aria-focused', 'true', options)
    }

    if ('not.be.focused' === condition) {
      return originalFn(element.find('label'), 'have.attr', 'aria-focused', 'false', options)
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
        return originalFn(element.find(selectors.datepicker.input), condition, key, value, options)
    }
  }

  if (isInput(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.input.main), condition, key, value, options)
    }
  }

  if (isSlider(element)) {
    if (
      ['be.disabled', 'not.be.disabled', 'be.focused', 'not.be.focused', 'have.value', 'not.have.value'].includes(
        condition,
      )
    ) {
      return originalFn(element.find(selectors.slider.main), condition, key, value, options)
    }
  }

  if (isSelect(element)) {
    switch (condition) {
      case 'have.focus':
      case 'not.have.focus':
      case 'be.disabled':
      case 'not.be.disabled':
        return originalFn(element.find(selectors.select.input), condition, key, value, options)

      case 'have.value':
        if (typeof key === 'string') {
          return originalFn(element.find(selectors.select.input), condition, key, value, options)
        }
        return originalFn(element, 'have.attr', 'data-value', key.join(','), value)

      case 'not.have.value':
        if (typeof key === 'string') {
          return originalFn(element.find(selectors.select.input), condition, key, value, options)
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
        return originalFn(element, 'have.class', 'is-disabled', key, value)

      case 'not.be.disabled':
        return originalFn(element, 'not.have.class', 'is-disabled', key, value)
    }
  }

  return originalFn(element, condition, key, value, options)
}

Cypress.Commands.overwrite('should', shouldAndAndCommand)
Cypress.Commands.overwrite('and', shouldAndAndCommand)
