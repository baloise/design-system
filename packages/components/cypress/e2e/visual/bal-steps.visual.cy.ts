describe('bal-steps', () => {
  beforeEach(() => cy.visit('/components/bal-steps/test/bal-steps.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps')
    cy.getByTestId('steps-with-four').compareSnapshot('tabs-steps-with-four')

    cy.platform('tablet').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-tablet')
    cy.getByTestId('steps-with-four').compareSnapshot('tabs-steps-with-four-tablet')

    cy.platform('mobile').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-mobile')
    cy.getByTestId('steps-with-four').compareSnapshot('tabs-steps-with-four-mobile')
  })
})
