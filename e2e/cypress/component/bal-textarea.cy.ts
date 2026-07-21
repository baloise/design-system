import { Components } from '../support/utils'

describe('bal-textarea', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalKeyPressSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')
    onBalBlurSpy = cy.spy().as('balBlur')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalKeyPressSpy = cy.spy().as('balKeyPress')

    cy.mount<Components.BalTextarea, HTMLBalTextareaElementEventMap>(`<bal-textarea></bal-textarea>`, {
      events: {
        click: onClickSpy,
        balInput: onBalInputSpy,
        balChange: onBalChangeSpy,
        balBlur: onBalBlurSpy,
        balFocus: onBalFocusSpy,
        balKeyPress: onBalKeyPressSpy,
      },
    })
  })

  it('should only call balInput and no balChange, because the input has still the focus', () => {
    cy.get('bal-textarea').find('textarea').should('have.value', '')
    cy.get('bal-textarea').find('textarea').type('Hello World!').blur()

    cy.get('bal-textarea').find('textarea').should('have.value', 'Hello World!')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 12)
    cy.get('@balBlur').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balKeyPress').should('have.been.callCount', 12)
  })

  it('should fire no balChange and no balInput, because the field has still a focus', () => {
    cy.get('bal-textarea').find('textarea').should('have.value', '')
    cy.get('bal-textarea').find('textarea').type('Hello World!')

    cy.get('bal-textarea').find('textarea').should('have.value', 'Hello World!')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('have.been.callCount', 12)
  })

  it('should fire balChange and no balInput, because only the value of the web component is changed', () => {
    cy.get('bal-textarea').invoke('attr', 'value', '88')

    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('not.have.been.called')
  })

  it('should fire a click event', () => {
    cy.get('bal-textarea').find('textarea').click()

    cy.get('@click').should('have.been.calledOnce')
  })

  it('should not fire a click event, because the input is disabled', () => {
    cy.get('bal-textarea').invoke('attr', 'disabled', true)
    cy.get('bal-textarea').find('textarea').should('be.disabled')
    cy.get('bal-textarea').find('textarea').click({ force: true })

    cy.get('@click').should('have.been.calledOnce')
  })
})
