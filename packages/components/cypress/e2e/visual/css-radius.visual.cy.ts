describe('css-radius.visual', () => {
  beforeEach(() => cy.visit('/test/css-radius.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('radius-none').compareSnapshot('css-radius-none-basic', 0.0)
    cy.getByTestId('radius-normal').compareSnapshot('css-radius-normal-basic', 0.0)
    cy.getByTestId('radius-large').compareSnapshot('css-radius-large-basic', 0.0)
    cy.getByTestId('radius-rounded').compareSnapshot('css-radius-rounded-basic', 0.0)
    cy.getByTestId('radius-small').compareSnapshot('css-radius-small-basic', 0.0)
    cy.getByTestId('radius-x-large').compareSnapshot('css-radius-none-x-large', 0.0)
  })
})
