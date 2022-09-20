describe('bal-toast', () => {
  before(() => cy.page('/components/notice/bal-toast/test/bal-toast.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('toast-basic', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('toast-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('toast-basic-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('toast-variants', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('toast-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('toast-variants-mobile', 0.0)
  })
})
