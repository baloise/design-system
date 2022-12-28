import { BalInputStepper } from '../../.storybook/vue/generated/components'

describe('bal-tag.cy.ts', () => {
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalIncreaseSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalDecreaseSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')
    onBalIncreaseSpy = cy.spy().as('balIncrease')
    onBalDecreaseSpy = cy.spy().as('balDecrease')

    cy.mount(BalInputStepper, {
      props: {
        min: 0,
        max: 2,
        value: 1,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
        onBalIncrease: onBalIncreaseSpy,
        onBalDecrease: onBalDecreaseSpy,
      },
    })
  })

  it('should increase a value and fire input, increase and change event', () => {
    cy.get('bal-input-stepper').find('.bal-button').eq(1).click()
    cy.get('@balInput').should('have.been.calledOnce')
    cy.get('@balIncrease').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail(2)
  })

  it('should decrease a value and fire input, decrease and change event', () => {
    cy.get('bal-input-stepper').find('.bal-button').eq(0).click()
    cy.get('@balInput').should('have.been.calledOnce')
    cy.get('@balDecrease').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail(0)
  })

  it('should decrease a value, decrease button should become disabled and it should only fire input, decrease and change event once', () => {
    cy.get('bal-input-stepper').find('.bal-button').eq(0).click({ force: true })
    cy.get('bal-input-stepper').find('.bal-button').eq(0).should('have.attr', 'disabled')
    cy.get('@balInput').should('have.been.calledOnce')
    cy.get('@balDecrease').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail(0)
  })

  it('should increase a value, increase become should become disabled and it should only fire input, decrease and change event once', () => {
    cy.get('bal-input-stepper').find('.bal-button').eq(1).click({ force: true })
    cy.get('bal-input-stepper').find('.bal-button').eq(1).should('have.attr', 'disabled')
    cy.get('@balInput').should('have.been.calledOnce')
    cy.get('@balIncrease').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail(2)
  })
})
