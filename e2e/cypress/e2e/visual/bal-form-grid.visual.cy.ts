describe('bal-form-grid', () => {
  beforeEach(() => cy.visit('/components/bal-form-grid/test/bal-form-grid.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('form-grid-basic-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('form-grid-basic-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('form-grid-basic-mobile')
  })
})
