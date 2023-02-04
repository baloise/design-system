describe('bal-steps', () => {
  beforeEach(() => cy.page('/components/bal-steps/test/bal-steps.visual.html'))

  it('basic component', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps', 0.0)

    cy.platform('tablet').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-tablet', 0.0)

    cy.platform('mobile').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-mobile', 0.0)
  })
})
