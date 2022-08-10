import { BalNumberInput } from '../../.storybook/vue/components'

describe('bal-number-input.cy.ts', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')

    cy.mount(BalNumberInput, {
      props: {
        onClick: onClickSpy,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
      },
    })
  })

  it('should fire balChange & balInput, because the input gets blurred', () => {
    cy.get('bal-number-input').invoke('attr', 'decimal', 1)
    cy.get('bal-number-input').find('input').type('.8').blur()

    cy.get('bal-number-input').find('input').should('have.value', '0.8')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 2)
  })

  it('should only call balInput and no balChange, because the input has still the focus', () => {
    cy.get('bal-number-input').find('input').should('have.value', '')
    cy.get('bal-number-input').find('input').type('1a2').blur()

    cy.get('bal-number-input').find('input').should('have.value', '12')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 2)
  })

  it('should fire no balChange and no balInput, because the field has still a focus', () => {
    cy.get('bal-number-input').find('input').should('have.value', '')
    cy.get('bal-number-input').find('input').type('1a2').blur()

    cy.get('bal-number-input').find('input').should('have.value', '12')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('have.been.callCount', 2)
  })

  it('should fire balChange and no balInput, because only the value of the web component is changed', () => {
    cy.get('bal-number-input').invoke('attr', 'value', '88')

    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('not.have.been.called')
  })

  it('should fire a click event', () => {
    cy.get('bal-number-input').find('input').click()

    cy.get('@click').should('have.been.calledOnce')
  })

  it('should not fire a click event, because the input is disabled', () => {
    cy.get('bal-number-input').invoke('attr', 'disabled', true)
    cy.get('bal-number-input').find('input').should('have.attr', 'disabled')
    cy.get('bal-number-input').find('input').click({ force: true })

    cy.get('@click').should('have.been.calledOnce')
  })
})
