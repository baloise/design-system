describe('bal-heading', () => {
  beforeEach(() => cy.visit('/components/typography/bal-label/test/bal-label.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('label-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('label-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('label-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('label-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('label-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('label-variants-mobile', 0.0)
  })
})
