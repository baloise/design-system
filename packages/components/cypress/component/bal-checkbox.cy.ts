import { BalCheckbox } from '../../.storybook/vue/generated/components'

describe('bal-checkbox.cy.ts', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount(BalCheckbox as any, {
      props: {
        onClick: onClickSpy,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
        onBalFocus: onBalFocusSpy,
        onBalBlur: onBalBlurSpy,
      },
      slots: {
        default: () => 'My label',
      },
    })
  })

  it('should have a default slot', () => {
    cy.get('bal-checkbox').contains('My label')
    cy.get('bal-checkbox').find('input').should('not.be.checked')
  })

  it('should fire change and focus events', () => {
    cy.get('bal-checkbox').click()
    cy.get('bal-checkbox').find('input').should('be.checked')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
  })

  it('should fire blur event after leaving the field', () => {
    cy.get('bal-checkbox').click().get('.bal-radio-checkbox__input').blur()
    cy.get('@balBlur').should('have.been.calledOnce')
  })

  it('should not fire change and focus events because checkbox is disabled', () => {
    cy.mount(BalCheckbox, {
      props: {
        disabled: true,
      },
    })

    cy.get('bal-checkbox').click({ force: true })
    cy.get('bal-checkbox').find('input').should('not.be.checked')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.calledOnce')
  })
})