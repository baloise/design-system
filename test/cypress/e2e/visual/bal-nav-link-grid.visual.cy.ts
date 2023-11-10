describe('bal-nav-link-grid', () => {
  beforeEach(() =>
    cy.visit('/components/bal-nav/bal-nav-link-grid/test/bal-nav-link-grid.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('widescreen').wait(32)
    cy.getByTestId('basic').compareSnapshot('basic-widescreen')

    cy.platform('desktop').wait(32)
    cy.getByTestId('basic').compareSnapshot('basic-desktop')

    cy.platform('mobile').wait(32)
    cy.getByTestId('basic').compareSnapshot('basic-mobile')
  })
})
