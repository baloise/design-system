import { Components } from '../support/utils'

describe('bal-date-calendar-cell', () => {
  let onBalSelectDaySpy: Cypress.Agent<sinon.SinonSpy>

  it('should emits balSelectDay event when clicked', () => {
    onBalSelectDaySpy = cy.spy().as('balSelectDay')
    cy.mount<Components.BalDateCalendarCell, HTMLBalDateCalendarCellElementEventMap>(
      `
      <bal-date-calendar-cell></bal-date-calendar-cell>`,
      {
        props: {
          day: 25,
          month: 12,
          year: 2023,
          isoDate: '2023-12-25',
          fullDate: 'December 25, 2023',
          selected: false,
          today: false,
          disabled: false,
        },
        events: {
          balSelectDay: onBalSelectDaySpy,
        },
      },
    ).as('dateCell')

    cy.get('.bal-date-calendar-cell').click()
    cy.get('@balSelectDay').should('have.been.calledOnce')
  })

  it('should not emit balSelectDay event when clicked', () => {
    onBalSelectDaySpy = cy.spy().as('balSelectDay')
    cy.mount<Components.BalDateCalendarCell, HTMLBalDateCalendarCellElementEventMap>(
      `
      <bal-date-calendar-cell></bal-date-calendar-cell>`,
      {
        props: {
          day: 25,
          month: 12,
          year: 2023,
          isoDate: '2023-12-25',
          fullDate: 'December 25, 2023',
          selected: false,
          today: false,
          disabled: true,
        },
        events: {
          balSelectDay: onBalSelectDaySpy,
        },
      },
    ).as('dateCell')

    cy.get('.bal-date-calendar-cell').click({ force: true })
    cy.get('@balSelectDay').should('not.have.been.called')
  })
})
