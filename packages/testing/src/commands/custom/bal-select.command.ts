import { log, selectors, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balSelectFindOptions',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.select.options, o)
      .then($el => {
        log('balSelectFindOptions', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balSelectShouldHaveOptions',
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
  'balSelectFindChips',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.select.chips, o)
      .then($el => {
        log('balSelectFindChips', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)
