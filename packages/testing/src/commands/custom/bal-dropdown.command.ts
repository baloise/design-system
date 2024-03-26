import { log, wrapOptions } from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.add(
  'balDropdownFindOptions',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.select.options, o)
      .then($el => {
        log('balDropdownFindOptions', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balDropdownShouldHaveOptions',
  {
    prevSubject: true,
  },
  (subject, labels, dataKey = 'label', options) => {
    log('balAccordionIsOpen', '', subject, options)
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
  'balDropdownFindChips',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.select.chips, o)
      .then($el => {
        log('balDropdownFindChips', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)
