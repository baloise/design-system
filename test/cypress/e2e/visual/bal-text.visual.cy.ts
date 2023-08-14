describe('bal-text', () => {
  beforeEach(() => cy.visit('/components/typography/bal-text/test/bal-text.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('text-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('text-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('text-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('text-variants-desktop')

    cy.platform('tablet')
    cy.compareSnapshot('text-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('text-variants-mobile')
  })
})
