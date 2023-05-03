import { isSelect, isSteps, isTabs } from '../helpers'
import { selectors } from '../../selectors'
import { byDataSelectors } from '../../selectors/selectors.util'

Cypress.Commands.overwrite('select', (originalFn: any, element: any, values: any, options) => {
  if (isSelect(element)) {
    let valueArray: any[] = []
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
      .wrap(element, { log: false })
      .find(selectContext.join(', '))
      .click({ multiple: values.length > 1 })
      .wrap(element, { log: false })
  }

  if (isTabs(element)) {
    if (typeof values === 'string') {
      return cy
        .wrap(element, { log: false })
        .find(byDataSelectors(selectors.tabs.item, ['label', 'value', 'index'], values), { log: false })
        .click()
        .wrap(element, { log: false })
    }
  }

  if (isSteps(element)) {
    if (typeof values === 'string') {
      return cy
        .wrap(element, { log: false })
        .find(byDataSelectors(selectors.steps.option, ['label', 'value', 'index'], values), { log: false })
        .click()
        .wrap(element, { log: false })
    }
  }

  return originalFn(element, values, options)
})
