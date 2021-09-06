const year = (date: Date): number => date.getFullYear()
const month = (date: Date): number => date.getMonth()
const day = (date: Date): number => date.getDate()
const pad = (value: number) => (value < 10 ? `0${value}` : `${value}`)
const isoString = (date: Date) => `${year(date)}-${pad(month(date) + 1)}-${pad(day(date))}`
const selectorDayBox = (date: Date) => `[data-date="${isoString(date)}"]`

Cypress.Commands.add(
  'balDatepickerToggle',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find('.datepicker-trigger-icon').click().wrap(subject)
  },
)

Cypress.Commands.add(
  'balDatepickerIsOpen',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find('bal-dropdown').should('have.attr', 'is-active', '').wrap(subject)
  },
)

Cypress.Commands.add(
  'balDatepickerIsClosed',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find('bal-dropdown').should('not.have.attr', 'is-active').wrap(subject)
  },
)

Cypress.Commands.add(
  'balDatepickerPick',
  {
    prevSubject: true,
  },
  (subject, date, arg2) => {
    return cy
      .wrap(subject)
      .balDatepickerIsOpen()
      .within(() => {
        cy.get('.month-select select').first().select(month(date).toString())
        cy.get('.year-select select').first().select(year(date).toString())
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
  (subject, date, arg2) => {
    return cy.wrap(subject).find(selectorDayBox(date)).should('not.have.class', 'is-disabled')
  },
)

Cypress.Commands.add(
  'balDatepickerIsDateNotInRange',
  {
    prevSubject: true,
  },
  (subject, date, arg2) => {
    return cy.wrap(subject).find(selectorDayBox(date)).should('have.class', 'is-disabled')
  },
)
