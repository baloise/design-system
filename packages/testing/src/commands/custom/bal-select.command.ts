import { selectors } from '../helpers'

Cypress.Commands.add(
  'balSelectFindOptions',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find(selectors.select.options)
  },
)

Cypress.Commands.add(
  'balSelectShouldHaveOptions',
  {
    prevSubject: true,
  },
  (subject, labels, dataKey = 'label') => {
    return cy
      .wrap(subject)
      .balSelectFindOptions()
      .should($o => {
        const dataItems = $o.map((_, el) => Cypress.$(el).attr(`data-${dataKey}`))
        expect(dataItems.get()).to.deep.eq(labels)
      })
  },
)

Cypress.Commands.add(
  'balSelectFindChips',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find(selectors.select.chips)
  },
)
