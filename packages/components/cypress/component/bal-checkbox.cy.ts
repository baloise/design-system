import { BalCheckbox } from '../../.storybook/vue/generated/components'
import BalCheckBoxTest from './bal-checkbox.vue'
import BalCheckboxButtonTest from './bal-checkbox-button.vue'

describe('bal-checkbox.cy.ts', () => {
  describe('checkbox', () => {
    let onClickSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

    it('should have a default slot', () => {
      onClickSpy = cy.spy().as('click')
      onBalFocusSpy = cy.spy().as('balFocus')
      onBalChangeSpy = cy.spy().as('balChange')
      onBalBlurSpy = cy.spy().as('balBlur')

      cy.mount(BalCheckbox as any, {
        props: {
          onClick: onClickSpy,
          onBalFocus: onBalFocusSpy,
          onBalChange: onBalChangeSpy,
          onBalBlur: onBalBlurSpy,
        },
        slots: { default: () => 'My label' },
      })

      cy.waitForDesignSystem()

      cy.get('bal-checkbox').contains('My label')
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

      cy.mount(BalCheckbox as any, {
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

      cy.get('bal-checkbox').contains('My label')
      cy.get('bal-checkbox').find('input').should('be.checked')

      cy.get('bal-checkbox').click({ force: true }).find('input').blur({ force: true })

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })
  })

  describe('checkbox-group', () => {
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

      cy.mount(BalCheckBoxTest as any, {
        props: {
          value: ['3'],
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
      cy.get('bal-checkbox').eq(0).click().find('input').blur()

      cy.get('bal-checkbox').eq(0).find('input').should('be.checked')
      cy.get('bal-checkbox').eq(1).find('input').should('not.be.checked')
      cy.get('bal-checkbox').eq(2).find('input').should('be.checked')

      cy.get('@click').should('have.been.calledOnce')
      cy.get('@balFocus').should('have.been.calledOnce')
      cy.get('@balInput').should('have.been.calledOnce')
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balBlur').should('have.have.been.calledOnce')
    })

    it('should change prop value of the group and not sent change event', () => {
      cy.get('bal-checkbox').eq(2).find('input').should('be.checked')
      cy.get('bal-checkbox').eq(0).find('input').should('not.be.checked')
      cy.get('bal-checkbox').eq(1).find('input').should('not.be.checked')

      cy.get('@balChange').should('not.have.been.called')
    })

    it('should not be able to select the disabled option', () => {
      cy.get('bal-checkbox').eq(2).invoke('attr', 'disabled', true)

      cy.get('bal-checkbox').eq(2).click({ force: true }).find('input').blur({ force: true })

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })
  })

  describe('checkbox-button', () => {
    let onClickSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

    beforeEach(() => {
      onClickSpy = cy.spy().as('click')
      onBalFocusSpy = cy.spy().as('balFocus')
      onBalChangeSpy = cy.spy().as('balChange')
      onBalBlurSpy = cy.spy().as('balBlur')

      cy.mount(BalCheckboxButtonTest as any, {
        props: {
          value: ['3'],
          onClick: onClickSpy,
          onBalFocus: onBalFocusSpy,
          onBalChange: onBalChangeSpy,
          onBalBlur: onBalBlurSpy,
        },
      })

      cy.waitForDesignSystem()
    })

    it('should select first one and send change event', () => {
      cy.get('bal-checkbox-button').eq(0).click().find('input').blur()

      cy.get('bal-checkbox-button').eq(0).find('input').should('be.checked')
      cy.get('bal-checkbox-button').eq(1).find('input').should('not.be.checked')
      cy.get('bal-checkbox-button').eq(2).find('input').should('be.checked')

      cy.get('@click').should('have.been.calledOnce')
      cy.get('@balFocus').should('have.been.calledOnce')
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balBlur').should('have.been.calledOnce')
    })

    it('should change prop value of the group and not sent change event', () => {
      cy.get('bal-checkbox-button').eq(2).find('input').should('be.checked')
      cy.get('bal-checkbox-button').eq(0).find('input').should('not.be.checked')
      cy.get('bal-checkbox-button').eq(1).find('input').should('not.be.checked')

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })

    it('should not be able to select the disabled option', () => {
      cy.get('bal-checkbox-button').eq(2).invoke('attr', 'disabled', true)

      cy.get('bal-checkbox-button').eq(2).click({ force: true }).find('input').blur({ force: true })

      cy.get('@click').should('not.have.been.called')
      cy.get('@balFocus').should('not.have.been.called')
      cy.get('@balChange').should('not.have.been.called')
      cy.get('@balBlur').should('not.have.been.called')
    })
  })
})
