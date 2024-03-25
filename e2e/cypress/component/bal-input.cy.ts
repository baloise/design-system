import { defineCustomElement } from "../../generated/components/bal-input";
import { Components } from "../../generated";

describe('bal-input.cy.ts', () => {
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

    cy.mount<Components.BalInput>(`<bal-input></bal-input>`, {
      defineCustomElement,
      props: {
        // disabled: true
      },
      events: {
        click: onClickSpy,
        balInput: onBalInputSpy,
        balChange: onBalChangeSpy,
        balBlur: onBalBlurSpy,
        balFocus: onBalFocusSpy,
        balKeyPress: onBalKeyPressSpy,
      }
    });
  })

  it('should only call balInput and no balChange, because the input has still the focus', () => {
    cy.get('bal-input').find('input').should('have.value', '')
    cy.get('bal-input').find('input').type('Hello World!').blur()

    cy.get('bal-input').find('input').should('have.value', 'Hello World!')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 12)
    cy.get('@balBlur').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balKeyPress').should('have.been.callCount', 12)
  })

  it('should fire no balChange and no balInput, because the field has still a focus', () => {
    cy.get('bal-input').find('input').should('have.value', '')
    cy.get('bal-input').find('input').type('Hello World!')

    cy.get('bal-input').find('input').should('have.value', 'Hello World!')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('have.been.callCount', 12)
  })

  it('should fire balChange and no balInput, because only the value of the web component is changed', () => {
    cy.get('bal-input').invoke('attr', 'value', '88')

    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('not.have.been.called')
  })

  it('should fire a click event', () => {
    cy.get('bal-input').find('input').click()

    cy.get('@click').should('have.been.calledOnce')
  })

  it('should not fire a click event, because the input is disabled', () => {
    cy.get('bal-input').invoke('attr', 'disabled', true)
    cy.get('bal-input').find('input').should('be.disabled')
    cy.get('bal-input').find('input').click({ force: true })

    cy.get('@click').should('have.been.calledOnce')
  })

  it('should fire input event when a field is cleared for claim-number mask', () => {
    cy.get('bal-input').invoke('attr', 'mask', 'claim-number')
    cy.get('bal-input').find('input').click({ force: true })
    cy.get('bal-input').find('input').type('1').blur()
    cy.get('bal-input').find('input').clear().blur()

    cy.get('@click').should('have.been.callCount', 2)
    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balInput').should('have.been.callCount', 2)
    cy.get('bal-input').find('input').should('have.value', '')
  })
})
