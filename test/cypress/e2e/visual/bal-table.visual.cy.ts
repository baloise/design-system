describe('bal-table', () => {
  beforeEach(() => cy.visit('/components/bal-table/test/bal-table.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('table-basic-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('table-basic-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('table-basic-mobile')
  })
})
