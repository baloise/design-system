describe('bal-text', () => {
  beforeEach(() => cy.visit('/components/typography/bal-text/test/bal-text.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('text-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('text-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('text-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('text-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('text-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('text-variants-mobile', 0.0)
  })
})
