import { Components } from '../support/utils'

describe('bal-checkbox', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

  it('should have a default slot', () => {
    onClickSpy = cy.spy().as('click')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount<Components.BalCheckbox, HTMLBalCheckboxElementEventMap>(`<bal-checkbox>My Label</bal-checkbox>`, {
      events: {
        click: onClickSpy,
        balFocus: onBalFocusSpy,
        balChange: onBalChangeSpy,
        balBlur: onBalBlurSpy,
      },
    })

    cy.get('bal-checkbox').contains('My Label')
    cy.get('bal-checkbox').find('input').should('not.be.checked')

    cy.get('bal-checkbox').click().find('input').blur()

    cy.get('@click').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balBlur').should('have.been.calledOnce')
  })

  it('should emit no events, because it is disabled', () => {
    onClickSpy = cy.spy().as('click')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount<Components.BalCheckbox, HTMLBalCheckboxElementEventMap>(`<bal-checkbox>My Label</bal-checkbox>`, {
      props: {
        disabled: true,
        checked: true,
      },
      events: {
        click: onClickSpy,
        balFocus: onBalFocusSpy,
        balChange: onBalChangeSpy,
        balBlur: onBalBlurSpy,
      },
    })

    cy.get('bal-checkbox').contains('My Label')
    cy.get('bal-checkbox').find('input').should('be.checked')

    cy.get('bal-checkbox').click({ force: true }).find('input').blur({ force: true })

    cy.get('@click').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.called')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balBlur').should('not.have.been.called')
  })
})
