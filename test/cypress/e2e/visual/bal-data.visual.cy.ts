describe('bal-data', () => {
  beforeEach(() => cy.visit('/components/bal-data/test/bal-data.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('data-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('data-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('data-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('data-variants-desktop')

    cy.platform('tablet')
    cy.compareSnapshot('data-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('data-variants-mobile')
  })
})
