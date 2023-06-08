describe('bal-nav-link', () => {
  beforeEach(() => cy.visit('/components/bal-nav/bal-nav-link/test/bal-nav-link.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('basic-desktop', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('basic-mobile', 0.0)
  })

  it('with title link', () => {
    cy.platform('desktop')
    cy.getByTestId('with-title-link').compareSnapshot('with-title-link-desktop', 0.0)

    cy.platform('mobile')
    cy.getByTestId('with-title-link').compareSnapshot('with-title-link-mobile', 0.0)
  })
})
