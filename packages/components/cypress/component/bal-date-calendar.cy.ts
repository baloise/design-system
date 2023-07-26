// Import the necessary Cypress commands
import { byTestId } from '../support/generated'
import { BalDateCalendar } from '../../.storybook/vue/generated/components'

describe('BalDateCalendarCell Component', () => {
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>

  it('emits balChange event when clicked', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount(BalDateCalendar, {
      props: {
        defaultDate: '2023-01-01',
        onBalChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.waitForDesignSystem()

    cy.get('bal-date-calendar').shadow().find('.day-cell').eq(6).click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2023-01-07')
  })

  it('select a date with the dropdown navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount(BalDateCalendar, {
      props: {
        defaultDate: '2023-01-01',
        onBalChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.waitForDesignSystem()

    cy.get('bal-date-calendar').shadow().find(byTestId('change-year-month')).click().wait(32)
    cy.get('bal-date-calendar').shadow().find(`#year-${2021}`).click().wait(32)
    cy.get('bal-date-calendar').shadow().find(`#month-${10}`).click().wait(32)
    cy.get('bal-date-calendar').shadow().find(`[aria-label="21.10.2021"]`).click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2021-10-21')
  })

  it.only('select a date with the next arrow navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount(BalDateCalendar, {
      props: {
        defaultDate: '2023-01-01',
        onBalChange: onBalChangeSpy,
      },
    })

    cy.waitForDesignSystem()

    cy.get('bal-date-calendar').shadow().find(byTestId('next-month')).click().wait(32)
    cy.get('bal-date-calendar').shadow().find(`[aria-label="21.02.2023"]`).click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2023-02-21')
  })

  it.only('select a date with the previous arrow navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount(BalDateCalendar, {
      props: {
        defaultDate: '2023-01-01',
        onBalChange: onBalChangeSpy,
      },
    })

    cy.waitForDesignSystem()

    cy.get('bal-date-calendar').shadow().find(byTestId('previous-month')).click().wait(32)
    cy.get('bal-date-calendar').shadow().find(`[aria-label="21.12.2022"]`).click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2022-12-21')
  })
})
