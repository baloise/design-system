import { isSelect, isTabs, selectors } from '../helpers'

Cypress.Commands.overwrite('select', (originalFn, element: Cypress.Chainable<JQuery>, values, options) => {
  if (isSelect(element)) {
    let valueArray = []
    if (typeof values === 'string') {
      valueArray.push(values)
    } else {
      valueArray = [...values]
    }

    if (valueArray.length === 0) {
      return cy.wrap(element).clear()
    }

    const selectContext = []
    for (let index = 0; index < valueArray.length; index++) {
      const val = valueArray[index]
      selectContext.push(`${selectors.select.options}[data-label="${val}"]`)
      selectContext.push(`${selectors.select.options}[data-value="${val}"]`)
    }

    return cy
      .wrap(element)
      .find(selectContext.join(', '))
      .click({ multiple: values.length > 1 })
      .wrap(element)
  }

  if (isTabs(element)) {
    if (typeof values === 'string') {
      return cy
        .wrap(element)
        .find(
          `${selectors.tabs.tabItems}[data-label="${values}"], ${selectors.tabs.tabItems}[data-value="${values}"], ${selectors.tabs.tabItems}[data-index="${values}"]`,
        )
        .click()
        .wrap(element)
    }
  }

  return originalFn(element, values, options)
})
