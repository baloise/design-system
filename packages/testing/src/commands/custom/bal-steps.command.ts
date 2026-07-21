import { log, wrapOptions } from '../helpers'
import { selectors } from '../../selectors'

Cypress.Commands.add(
  'balStepsFindItems',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.steps.option, o)
      .then($el => {
        log('balStepsFindItems', '', $el, options)
        return $el
      })
      .waitForComponents(o)
  },
)

Cypress.Commands.add(
  'balStepsFindLabel',
  {
    prevSubject: true,
  },
  (subject, options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .find(selectors.steps.optionLabel, o)
      .then($el => {
        log('balStepsFindLabel', '', $el, options)
        return $el
      })
  },
)

Cypress.Commands.add(
  'balStepsShouldHaveItems',
  {
    prevSubject: true,
  },
  (subject, labels, dataKey = 'label', options) => {
    const o = wrapOptions(options)
    return cy
      .wrapComponent(subject, o)
      .balStepsFindItems(o)
      .should($o => {
        const dataItems = $o.map((_, el) => Cypress.$(el).attr(`data-${dataKey}`))
        expect(dataItems.get()).to.deep.eq(labels)
      })
  },
)

Cypress.Commands.add(
  'balStepsItemShouldHaveState',
  {
    prevSubject: true,
  },
  (subject, state = 'done', options) => {
    log('balStepsItemShouldHaveState', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('have.class', `bal-steps__nav__item--${state}`)
  },
)

Cypress.Commands.add(
  'balStepsItemShouldNotHaveState',
  {
    prevSubject: true,
  },
  (subject, state = 'done', options) => {
    log('balStepsItemShouldNotHaveState', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).should('not.have.class', `bal-steps__nav__item--${state}`)
  },
)
