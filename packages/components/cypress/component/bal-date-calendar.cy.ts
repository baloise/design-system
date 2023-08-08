// Import the necessary Cypress commands
import { byTestId } from '../support/generated'
import { BalDateCalendar } from '../../.storybook/vue/generated/components'
import { i18nDate } from '../../dist'

describe('BalDateCalendar Component', () => {
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

    cy.getByRole('button', { name: '07.01.2023' }).click()

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

    cy.getByRole('button', { name: 'Januar 2023' }).click()
    cy.getByRole('button', { name: '2024' }).click()
    cy.getByRole('button', { name: 'Februar' }).click()
    cy.getByRole('button', { name: '11.02.2024' }).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2024-02-11')
  })

  it('select a date with the next arrow navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount(BalDateCalendar, {
      props: {
        defaultDate: '2023-01-01',
        onBalChange: onBalChangeSpy,
      },
    })

    cy.waitForDesignSystem()

    cy.getByRole('button', { name: i18nDate.de.nextMonth }).click()
    cy.getByRole('button', { name: '11.02.2023' }).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2023-02-11')
  })

  it('select a date with the previous arrow navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount(BalDateCalendar, {
      props: {
        defaultDate: '2023-01-01',
        onBalChange: onBalChangeSpy,
      },
    })

    cy.waitForDesignSystem()

    cy.getByRole('button', { name: i18nDate.de.previousMonth }).click()
    cy.getByRole('button', { name: '11.12.2022' }).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2022-12-11')
  })
})
