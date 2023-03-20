describe('bal-footer', () => {
  beforeEach(() => cy.page('/components/bal-footer/test/bal-footer.visual.html'))

  it('basic component', () => {
    cy.platform('desktop').wait(1000)
    cy.getByTestId('basic').compareSnapshot('basic-footer-desktop', 0.0)
    cy.getByTestId('all-variations').compareSnapshot('all-variations-footer-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('basic-footer-tablet', 0.0)
    cy.getByTestId('all-variations').compareSnapshot('all-variations-footer-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('basic-footer-mobile', 0.0)
    cy.getByTestId('all-variations').compareSnapshot('all-variations-footer-mobile', 0.0)
  })

  it.skip('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('footer-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('footer-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('footer-variants-mobile', 0.0)
  })
})
