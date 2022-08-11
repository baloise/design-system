import { BalInput } from '../../.storybook/vue/components'

describe('bal-input.cy.ts', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')

    cy.mount(BalInput, {
      props: {
        onClick: onClickSpy,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
      },
    })
  })

  it('should only call balInput and no balChange, because the input has still the focus', () => {
    cy.get('bal-input').find('input').should('have.value', '')
    cy.get('bal-input').find('input').type('Hello World!').blur()

    cy.get('bal-input').find('input').should('have.value', 'Hello World!')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 12)
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
    cy.get('bal-input').find('input').should('have.attr', 'disabled')
    cy.get('bal-input').find('input').click({ force: true })

    cy.get('@click').should('have.been.calledOnce')
  })
})
