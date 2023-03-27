describe('bal-heading', () => {
  beforeEach(() => cy.visit('/components/bal-heading/test/bal-heading.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('heading-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('heading-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('heading-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('heading-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('heading-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('heading-variants-mobile', 0.0)
  })
})
