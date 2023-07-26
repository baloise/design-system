// Import the necessary Cypress commands
import { BalDateCalendarCell } from '../../.storybook/vue/generated/components'

describe('BalDateCalendarCell Component', () => {
  let onBalSelectDaySpy: Cypress.Agent<sinon.SinonSpy>

  it('emits balSelectDay event when clicked', () => {
    onBalSelectDaySpy = cy.spy().as('balSelectDay')
    cy.mount(BalDateCalendarCell, {
      props: {
        day: 25,
        month: 12,
        year: 2023,
        isoDate: '2023-12-25',
        fullDate: 'December 25, 2023',
        selected: false,
        today: false,
        disabled: false,
        onBalSelectDay: onBalSelectDaySpy,
      },
    }).as('dateCell')

    cy.waitForDesignSystem()

    cy.get('.day-cell').click()
    cy.get('@balSelectDay').should('have.been.calledOnce')
  })

  it('emits balSelectDay event when clicked', () => {
    onBalSelectDaySpy = cy.spy().as('balSelectDay')
    cy.mount(BalDateCalendarCell, {
      props: {
        day: 25,
        month: 12,
        year: 2023,
        isoDate: '2023-12-25',
        fullDate: 'December 25, 2023',
        selected: false,
        today: false,
        disabled: true,
        onBalSelectDay: onBalSelectDaySpy,
      },
    }).as('dateCell')

    cy.waitForDesignSystem()

    cy.get('.day-cell').click({ force: true })
    cy.get('@balSelectDay').should('not.have.been.called')
  })
})
