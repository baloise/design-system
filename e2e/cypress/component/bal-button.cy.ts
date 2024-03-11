import { BalButton } from '../support/utils'

describe('bal-button.cy.ts', () => {
  it('should have a default slot', () => {
    cy.mount(BalButton, { slots: { default: () => 'My Button' } }).waitForDesignSystem()
    cy.get('bal-button').contains('My Button')
  })

  it('should fire close event', () => {
    const onClickSpy = cy.spy().as('click')
    cy.mount(BalButton, {
      props: {
        onClick: onClickSpy,
      },
      slots: { default: () => 'My Button' },
    }).waitForDesignSystem()
    cy.get('bal-button').find('button').click()
    cy.get('@click').should('have.been.calledOnce')
  })

  it('should fire close event', () => {
    cy.mount(BalButton, {
      props: {
        disabled: true,
      },
    }).waitForDesignSystem()

    cy.get('bal-button').find('button').should('be.disabled')
  })
})
