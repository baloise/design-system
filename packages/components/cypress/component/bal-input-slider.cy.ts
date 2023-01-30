import { BalInputSlider } from '../../.storybook/vue/generated/components'

describe('bal-input-slider.cy.ts', () => {
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')
    onClickSpy = cy.spy().as('click')

    cy.mount(BalInputSlider, {
      props: {
        value: 0,
        step: 20,
        min: 0,
        max: 100,
        hasTicks: true,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
        onClick: onClickSpy,
      },
    })
  })

  it('should increase a value and fire input, increase and change event', () => {
    // cy.get('bal-input-slider').find('input').invoke('val', 20).trigger('change')
    // cy.get('bal-input-slider').find('input').should('have.attr', 'step', 20)
    cy.get('bal-input-slider').find('input').click(202, 26, { force: true })
    // cy.get('bal-input-slider').find('input').focus().type('{rightArrow}{rightArrow}{rightArrow}')

    // cy.get('@balChange').should('have.been.calledOnce')
    // cy.get('@balChange').shouldHaveEventDetail(20)
  })
})
