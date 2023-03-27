describe('bal-steps', () => {
  beforeEach(() => cy.visit('/components/bal-steps/test/bal-steps.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps', 0.0)

    cy.platform('tablet').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-tablet', 0.0)

    cy.platform('mobile').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-mobile', 0.0)
  })
})
