import { selectors } from '../helpers'

Cypress.Commands.add(
  'balTabsFindItems',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find(selectors.tabs.tabItems)
  },
)

Cypress.Commands.add(
  'balTabsShouldHaveItems',
  {
    prevSubject: true,
  },
  (subject, labels, dataKey = 'label') => {
    return cy
      .wrap(subject)
      .balTabsFindItems()
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
  (subject, state = 'done') => {
    const cssClass = `is-${state}`
    return cy.wrap(subject).should('have.class', cssClass)
  },
)

Cypress.Commands.add(
  'balTabsFindActionButton',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.tabs.action)
  },
)
