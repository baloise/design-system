describe('bal-nav-link-grid', () => {
  beforeEach(() =>
    cy.visit('/components/bal-nav/bal-nav-link-grid/test/bal-nav-link-grid.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('widescreen')
    cy.getByTestId('basic').compareSnapshot('basic-widescreen', 0.0)

    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('basic-desktop', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('basic-mobile', 0.0)
  })
})
