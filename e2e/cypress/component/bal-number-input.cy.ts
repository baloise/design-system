import { byTestId } from '../../../packages/testing/src'
import { Components } from '../support/utils'

describe('bal-number-input', () => {
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

    cy.mount<Components.BalNumberInput, HTMLBalNumberInputElementEventMap>(`<bal-number-input></bal-number-input>`, {
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

  it('should fire balChange because the input gets blurred', () => {
    cy.get('bal-number-input').waitForComponents().invoke('attr', 'decimal', 1)
    cy.get('bal-number-input').find('input').type('.8').blur()

    cy.get('bal-number-input').find('input').should('have.value', '0.8')
    cy.get('@balChange').should('have.been.calledOnce')
  })

  it('should fire balFocus, balKeyPress, balInput and balBlur', () => {
    cy.get('bal-number-input').waitForComponents().invoke('attr', 'decimal', 1)
    cy.get('bal-number-input').find('input').type('.8').blur()

    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balKeyPress').should('have.been.callCount', 2)
    cy.get('@balInput').should('have.been.callCount', 2)
    cy.get('@balBlur').should('have.been.calledOnce')
  })

  it('should only call balInput and no balChange, because the input has still the focus', () => {
    cy.get('bal-number-input').waitForComponents().find('input').should('have.value', '')
    cy.get('bal-number-input').find('input').type('1a2')

    cy.get('bal-number-input').find('input').should('have.value', '12')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('have.been.callCount', 2)
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balBlur').should('not.have.been.called')
  })

  it('should fire balChange and no balInput, because only the value of the web component is changed', () => {
    cy.get('bal-number-input').waitForComponents().invoke('attr', 'value', '88')

    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('not.have.been.called')
  })

  it('should fire a click event', () => {
    cy.get('bal-number-input').waitForComponents().find('input').click()

    cy.get('@click').should('have.been.calledOnce')
  })

  it.skip('should not fire a click event, because the input is disabled', () => {
    cy.get('bal-number-input').waitForComponents().invoke('attr', 'disabled', true)
    cy.get('bal-number-input').find('input').should('be.disabled')
    cy.get('bal-number-input').find('input').click({ force: true })

    cy.get('@click').should('not.have.been.called')
  })

  it('should have a default value 0 because of exact-number attr', () => {
    cy.get('bal-number-input').find('input').should('have.value', '')
    cy.get('bal-number-input').invoke('attr', 'exact-number', true)
    cy.get('bal-number-input').find('input').type('1').blur()

    cy.get('bal-number-input').find('input').should('have.value', '1')
    cy.get('bal-number-input').find('input').clear().blur()
    cy.get('bal-number-input').find('input').should('have.value', '0')

    cy.get('@click').should('have.been.calledTwice')
    cy.get('@balChange').should('have.been.calledTwice')
    cy.get('@balInput').should('have.been.calledTwice')
    cy.get('@balFocus').should('have.been.calledTwice')
    cy.get('@balBlur').should('have.been.calledTwice')
  })

  it('should update german numbers with decimal', () => {
    cy.window().then((win: any) => (win.BaloiseDesignSystem.config.region = 'DE'))
    cy.get('bal-number-input').waitForComponents().invoke('attr', 'decimal', 2)

    cy.get('bal-number-input').find('input').type('1').blur()

    cy.get('bal-number-input').find('input').should('have.value', '1,00')

    cy.get('bal-number-input').find('input').click().blur()
    cy.get('bal-number-input').find('input').should('have.value', '1,00')
    cy.get('@balChange').should('have.been.calledOnce')
  })

  it('should update german numbers with thousand seperator', () => {
    cy.window().then((win: any) => (win.BaloiseDesignSystem.config.region = 'DE'))
    cy.get('bal-number-input').waitForComponents().invoke('attr', 'decimal', 2)

    cy.get('bal-number-input').find('input').type('1000,42').blur()

    cy.get('bal-number-input').find('input').should('have.value', '1.000,42')

    cy.get('bal-number-input').find('input').click().blur()
    cy.get('bal-number-input').find('input').should('have.value', '1.000,42')
    cy.get('@balChange').should('have.been.calledOnce')
  })

  it('should accept numbers with thousand separator', () => {
    cy.get('bal-number-input').find('input').type('42\'000').blur()
    cy.get('bal-number-input').find('input').should('have.value', '42’000')
  })
})
