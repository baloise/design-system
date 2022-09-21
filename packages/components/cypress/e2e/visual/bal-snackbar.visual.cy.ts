describe('bal-snackbar', () => {
  before(() => cy.page('/components/notice/bal-snackbar/test/bal-snackbar.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('snackbar-basic', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('snackbar-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('snackbar-basic-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('snackbar-variants', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('snackbar-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('snackbar-variants-mobile', 0.0)
  })
})
