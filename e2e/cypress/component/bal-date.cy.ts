import { Components, i18nBalDate } from '../support/utils'

describe('bal-date', () => {
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>

  it('emits balChange event when typed', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount<Components.BalDate, HTMLBalDateElementEventMap>(`<bal-date></bal-date>`, {
      props: {
        defaultDate: '2023-01-01',
        placeholder: 'Enter date',
      },
      events: {
        balChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.getByPlaceholder('Enter date')
      .click()
      .type('2.2.23', { delay: 20 })
      .blur({ force: true })
      .should('have.value', '02.02.2023')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2023-02-02')
  })

  it('emits balChange event when clicked', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount<Components.BalDate, HTMLBalDateElementEventMap>(`<bal-date></bal-date>`, {
      props: {
        defaultDate: '2023-01-01',
        placeholder: 'Enter date',
      },
      events: {
        balChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.getByRole('button', { name: i18nBalDate.de.toggleDatepicker, hidden: true }).click()
    cy.getByRole('button', { name: '11.01.2023' }).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2023-01-11')
  })

  it('select a date with the dropdown navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount<Components.BalDate, HTMLBalDateElementEventMap>(`<bal-date></bal-date>`, {
      props: {
        defaultDate: '2023-01-01',
        placeholder: 'Enter date',
      },
      events: {
        balChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.getByRole('button', { name: i18nBalDate.de.toggleDatepicker, hidden: true }).click()
    cy.getByRole('button', { name: 'Januar 2023' }).click()
    cy.getByRole('button', { name: '2024' }).click()
    cy.getByRole('button', { name: 'Februar' }).click()
    cy.getByRole('button', { name: '11.02.2024' }).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2024-02-11')
  })

  it('select a date with the next arrow navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount<Components.BalDate, HTMLBalDateElementEventMap>(`<bal-date></bal-date>`, {
      props: {
        defaultDate: '2023-01-01',
        placeholder: 'Enter date',
      },
      events: {
        balChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.getByRole('button', { name: i18nBalDate.de.toggleDatepicker, hidden: true }).click()
    cy.getByRole('button', { name: i18nBalDate.de.nextMonth }).click()
    cy.getByRole('button', { name: '11.02.2023' }).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2023-02-11')
  })

  it('select a date with the previous arrow navigation', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount<Components.BalDate, HTMLBalDateElementEventMap>(`<bal-date></bal-date>`, {
      props: {
        defaultDate: '2023-01-01',
        placeholder: 'Enter date',
      },
      events: {
        balChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.getByRole('button', { name: i18nBalDate.de.toggleDatepicker, hidden: true }).click()
    cy.getByRole('button', { name: i18nBalDate.de.previousMonth }).click()
    cy.getByRole('button', { name: '11.12.2022' }).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('2022-12-11')
  })

  it('check if invalid date is returned', () => {
    onBalChangeSpy = cy.spy().as('balChange')
    cy.mount<Components.BalDate, HTMLBalDateElementEventMap>(`<bal-date allow-invalid-value></bal-date>`, {
      props: {
        defaultDate: '2023-01-01',
        placeholder: 'Enter date',
      },
      events: {
        balChange: onBalChangeSpy,
      },
    }).as('calendar')

    cy.getByPlaceholder('Enter date')
      .click()
      .type('2.42.2023', { delay: 20 })
      .blur({ force: true })
      .should('have.value', '02.42.2023')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('INVALID_VALUE')
  })
})
