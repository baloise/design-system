import { log, wrapOptions } from '../helpers'

Cypress.Commands.add(
  'balInputStepperIncrease',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balInputStepperIncrease', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).find('[data-testid="increase"]', o).click(o).wrapComponent(subject, o)
  },
)

Cypress.Commands.add(
  'balInputStepperDecrease',
  {
    prevSubject: true,
  },
  (subject, options) => {
    log('balInputStepperDecrease', '', subject, options)
    const o = wrapOptions(options)
    return cy.wrapComponent(subject, o).find('[data-testid="decrease"]', o).click(o).wrapComponent(subject, o)
  },
)
