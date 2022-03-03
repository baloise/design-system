import { formatDateString } from '@baloise/web-app-utils'
import { getYear, getMonth } from 'date-fns'

const selectorDayBox = (date: Date) => `[data-date="${formatDateString(date)}"]`

Cypress.Commands.add(
  'balDatepickerToggle',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find('.datepicker-trigger-icon').click().wrap(subject)
  },
)

Cypress.Commands.add(
  'balDatepickerIsOpen',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find('bal-popover').should('have.attr', 'aria-presented', 'true').wrap(subject)
  },
)

Cypress.Commands.add(
  'balDatepickerIsClosed',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find('bal-popover').should('not.have.attr', 'aria-presented').wrap(subject)
  },
)

Cypress.Commands.add(
  'balDatepickerPick',
  {
    prevSubject: true,
  },
  (subject, date) => {
    return cy
      .wrap(subject)
      .balDatepickerIsOpen()
      .within(() => {
        cy.get('.month-select select').first().select(getMonth(date).toString())
        cy.get('.year-select select').first().select(getYear(date).toString())
        cy.get(selectorDayBox(date)).click()
      })
      .wrap(subject)
  },
)

Cypress.Commands.add(
  'balDatepickerIsDateInRange',
  {
    prevSubject: true,
  },
  (subject, date) => {
    return cy.wrap(subject).find(selectorDayBox(date)).should('not.have.class', 'is-disabled')
  },
)

Cypress.Commands.add(
  'balDatepickerIsDateNotInRange',
  {
    prevSubject: true,
  },
  (subject, date) => {
    return cy.wrap(subject).find(selectorDayBox(date)).should('have.class', 'is-disabled')
  },
)
