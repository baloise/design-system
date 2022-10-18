describe('bal-footer', () => {
  before(() => cy.page('/components/bal-footer/test/bal-footer.visual.html'))

  it('basic component', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://www.baloise.ch/app-integration/footer-links/*',
    }).as('getFooterLinks')

    cy.wait('@getFooterLinks')

    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('footer-desktop', 0.0)

    // cy.platform('tablet')
    // cy.getByTestId('basic').compareSnapshot('footer-tablet', 0.0)

    // cy.platform('mobile')
    // cy.getByTestId('basic').compareSnapshot('footer-mobile', 0.0)
  })

  // it('component variants', () => {
  //   cy.platform('desktop')
  //   cy.compareSnapshot('footer-variants-desktop', 0.0)

  //   cy.platform('tablet')
  //   cy.compareSnapshot('footer-variants-tablet', 0.0)

  //   cy.platform('mobile')
  //   cy.compareSnapshot('footer-variants-mobile', 0.0)
  // })
})
