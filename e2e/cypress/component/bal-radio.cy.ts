import { BalRadio } from '../support/utils'
import BalRadioTest from './bal-radio.vue'
import BalRadioButtonTest from './bal-radio-button.vue'

describe('bal-radio.cy.ts', () => {
  describe('radio', () => {
    let onClickSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

    it('should have a default slot', () => {
      onClickSpy = cy.spy().as('click')
      onBalFocusSpy = cy.spy().as('balFocus')
      onBalChangeSpy = cy.spy().as('balChange')
      onBalBlurSpy = cy.spy().as('balBlur')

      cy.mount(BalRadio as any, {
        props: {
          onClick: onClickSpy,
          onBalFocus: onBalFocusSpy,
          onBalChange: onBalChangeSpy,
          onBalBlur: onBalBlurSpy,
        },
        slots: { default: () => 'My label' },
      })

      cy.waitForDesignSystem()

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

      cy.mount(BalRadio as any, {
        props: {
          disabled: true,
          checked: true,
          onClick: onClickSpy,
          onBalFocus: onBalFocusSpy,
          onBalChange: onBalChangeSpy,
          onBalBlur: onBalBlurSpy,
        },
        slots: { default: () => 'My label' },
      })

      cy.waitForDesignSystem()

      cy.get('bal-radio').contains('My label')
      cy.get('bal-radio').find('input').should('be.checked')

      cy.get('bal-radio').click({ force: true }).find('input').blur({ force: true })

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })
  })

  describe('radio-group', () => {
    let onClickSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

    beforeEach(() => {
      onClickSpy = cy.spy().as('click')
      onBalFocusSpy = cy.spy().as('balFocus')
      onBalInputSpy = cy.spy().as('balInput')
      onBalChangeSpy = cy.spy().as('balChange')
      onBalBlurSpy = cy.spy().as('balBlur')

      cy.mount(BalRadioTest as any, {
        props: {
          value: '3',
          onClick: onClickSpy,
          onBalFocus: onBalFocusSpy,
          onBalInput: onBalInputSpy,
          onBalChange: onBalChangeSpy,
          onBalBlur: onBalBlurSpy,
        },
      })

      cy.waitForDesignSystem()
    })

    it('should select first one and send change event', () => {
      cy.get('bal-radio').eq(0).click().find('input').blur()

      cy.get('bal-radio').eq(0).find('input').should('be.checked')
      cy.get('bal-radio').eq(1).find('input').should('not.be.checked')
      cy.get('bal-radio').eq(2).find('input').should('not.be.checked')

      cy.get('@click').should('have.been.calledOnce')
      cy.get('@balFocus').should('have.been.calledOnce')
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balBlur').should('have.have.been.calledOnce')
    })

    it('should change prop value of the group and not sent change event', () => {
      cy.get('bal-radio').eq(2).find('input').should('be.checked')
      cy.get('bal-radio').eq(0).find('input').should('not.be.checked')
      cy.get('bal-radio').eq(1).find('input').should('not.be.checked')

      cy.get('@balChange').should('not.have.been.called')
    })

    it('should not be able to select the disabled option', () => {
      cy.get('bal-radio').eq(2).invoke('attr', 'disabled', true)

      cy.get('bal-radio').eq(2).click({ force: true }).find('input').blur({ force: true })

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })
  })

  describe('radio-button', () => {
    let onClickSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

    beforeEach(() => {
      onClickSpy = cy.spy().as('click')
      onBalFocusSpy = cy.spy().as('balFocus')
      onBalChangeSpy = cy.spy().as('balChange')
      onBalBlurSpy = cy.spy().as('balBlur')

      cy.mount(BalRadioButtonTest as any, {
        props: {
          value: '3',
          onClick: onClickSpy,
          onBalFocus: onBalFocusSpy,
          onBalChange: onBalChangeSpy,
          onBalBlur: onBalBlurSpy,
        },
      })

      cy.waitForDesignSystem()
    })

    it('should select first one and send change event', () => {
      cy.get('bal-radio-button').eq(0).click().find('input').blur()

      cy.get('bal-radio-button').eq(0).find('input').should('be.checked')
      cy.get('bal-radio-button').eq(1).find('input').should('not.be.checked')
      cy.get('bal-radio-button').eq(2).find('input').should('not.be.checked')

      cy.get('@click').should('have.been.calledOnce')
      cy.get('@balFocus').should('have.been.calledOnce')
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balBlur').should('have.been.calledOnce')
    })

    it('should change prop value of the group and not sent change event', () => {
      cy.get('bal-radio-button').eq(2).find('input').should('be.checked')
      cy.get('bal-radio-button').eq(0).find('input').should('not.be.checked')
      cy.get('bal-radio-button').eq(1).find('input').should('not.be.checked')

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })

    it('should not be able to select the disabled option', () => {
      cy.get('bal-radio-button').eq(2).invoke('attr', 'disabled', true)

      cy.get('bal-radio-button').eq(2).click({ force: true }).find('input').blur({ force: true })

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })
  })
})
