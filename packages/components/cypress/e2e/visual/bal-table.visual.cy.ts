describe('bal-table', () => {
  before(() => cy.page('/components/bal-table/test/bal-table.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('table-basic-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('table-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('table-basic-mobile', 0.0)
  })
})
