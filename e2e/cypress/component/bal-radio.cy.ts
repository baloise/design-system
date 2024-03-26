import { Components } from '../support/utils'

describe('bal-radio', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

  it('should have a default slot', () => {
    onClickSpy = cy.spy().as('click')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount<Components.BalRadio, HTMLBalRadioElementEventMap>(`<bal-radio>My label</bal-radio>`, {
      events: {
        click: onClickSpy,
        balFocus: onBalFocusSpy,
        balChange: onBalChangeSpy,
        balBlur: onBalBlurSpy,
      },
    })

    cy.get('bal-radio').contains('My label')
    cy.get('bal-radio').find('input').should('not.be.checked')

    cy.get('bal-radio').click().find('input').blur()

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

    cy.mount<Components.BalRadio, HTMLBalRadioElementEventMap>(`<bal-radio>My label</bal-radio>`, {
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

    cy.get('bal-radio').contains('My label')
    cy.get('bal-radio').find('input').should('be.checked')

    cy.get('bal-radio').click({ force: true }).find('input').blur({ force: true })

    cy.get('@click').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.called')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balBlur').should('not.have.been.called')
  })
})
