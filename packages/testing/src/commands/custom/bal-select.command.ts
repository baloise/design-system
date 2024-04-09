import { isDropDown, log, wrapOptions } from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.add(
  'balSelectFindOptions',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)

    if (isDropDown(subject)) {
      return cy
        .wrapComponent(subject, o)
        .find(selectors.dropdown.options, o)
        .then($el => log('balSelectFindOptions', '', $el, options))
        .waitForComponents(o)
    } else {
      return cy
        .wrapComponent(subject, o)
        .find(selectors.select.options, o)
        .then($el => log('balSelectFindOptions', '', $el, options))
        .waitForComponents(o)
    }
  },
)

Cypress.Commands.add(
  'balSelectShouldHaveOptions',
  {
    prevSubject: true,
  },
  (subject, labels, dataKey = 'label', options) => {
    log('balSelectShouldHaveOptions', '', subject, options)
    const o = wrapOptions(options)

    return cy
      .wrapComponent(subject, o)
      .balSelectFindOptions(o)
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
  (subject, options) => {
    const o = wrapOptions(options)
    const selector = isDropDown(subject) ? selectors.dropdown.chips : selectors.select.chips

    return cy
      .wrapComponent(subject, o)
      .find(selector, o)
      .then($el => log('balSelectFindChips', '', $el, options))
      .waitForComponents(o)
  },
)
