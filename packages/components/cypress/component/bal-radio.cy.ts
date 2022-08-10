import { BalRadio } from '../../.storybook/vue/components'
import BalRadioTest from './bal-radio.vue'

describe('bal-radio.cy.ts', () => {
  describe('radio', () => {
    it('should have a default slot', () => {
      cy.mount(BalRadio, { slots: { default: () => 'My label' } })
      cy.get('bal-radio').contains('My label')
      cy.get('bal-radio').find('input').should('not.be.checked')
    })
  })

  describe('radio-group', () => {
    let onClickSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
    let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>

    beforeEach(() => {
      onClickSpy = cy.spy().as('click')
      onBalChangeSpy = cy.spy().as('balChange')
      onBalInputSpy = cy.spy().as('balInput')

      cy.mount(BalRadioTest, {
        props: {
          onClick: onClickSpy,
          onBalInput: onBalInputSpy,
          onBalChange: onBalChangeSpy,
        },
      })
    })

    it('should select first one and send change event', () => {
      cy.get('bal-radio').eq(0).click()

      cy.get('bal-radio').eq(0).find('input').should('be.checked')
      cy.get('bal-radio').eq(1).find('input').should('not.be.checked')
      cy.get('bal-radio').eq(2).find('input').should('not.be.checked')
      cy.get('@balChange').should('have.been.calledOnce')
    })

    it('should change prop value of the group and not sent change event', () => {
      cy.get('bal-radio-group').invoke('attr', 'value', '3')

      cy.get('bal-radio').eq(2).find('input').should('be.checked')
      cy.get('bal-radio').eq(0).find('input').should('not.be.checked')
      cy.get('bal-radio').eq(1).find('input').should('not.be.checked')
      cy.get('@balChange').should('not.have.been.called')
    })

    it('should not be able to select the disabled option', () => {
      cy.get('bal-radio').eq(2).invoke('attr', 'disabled', true)

      cy.get('bal-radio').eq(2).click({ force: true })
      cy.get('bal-radio').eq(0).click()

      cy.get('@balChange').should('have.been.calledOnce')
    })
  })
})
