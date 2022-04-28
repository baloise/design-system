import { log, selectors, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balTabsFindItems',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.tabs.tabItems, o)
      .then($el => {
        log('balTabsFindItems', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balTabsShouldHaveItems',
  {
    prevSubject: true,
  },
  (subject, labels, dataKey = 'label', options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .balTabsFindItems(o)
      .should($o => {
        const dataItems = $o.map((_, el) => Cypress.$(el).attr(`data-${dataKey}`))
        expect(dataItems.get()).to.deep.eq(labels)
      })
  },
)

Cypress.Commands.add(
  'balTabItemShouldHaveState',
  {
    prevSubject: true,
  },
  (subject, state = 'done', options) => {
    log('balTabItemShouldHaveState', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('have.class', `is-${state}`)
  },
)

Cypress.Commands.add(
  'balTabsFindActionButton',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.tabs.action, o)
      .then($el => {
        log('balTabsFindActionButton', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)
