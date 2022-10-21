describe('bal-icon', () => {
  before(() => cy.page('/components/bal-icon/test/bal-icon.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('icon-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('icon-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('icon-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('icon-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('icon-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('icon-variants-mobile', 0.0)
  })
})
