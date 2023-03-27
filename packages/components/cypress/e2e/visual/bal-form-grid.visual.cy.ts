describe('bal-form-grid', () => {
  beforeEach(() => cy.visit('/components/form/bal-form-grid/test/bal-form-grid.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('form-grid-basic-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('form-grid-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('form-grid-basic-mobile', 0.0)
  })
})
