describe('css-typography.visual', () => {
  beforeEach(() => cy.visit('/test/css-typography.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('display').compareSnapshot('css-typography-display', 0.0)
    cy.getByTestId('title').compareSnapshot('css-typography-title', 0.0)
    cy.getByTestId('text').compareSnapshot('css-typography-text', 0.0)
    cy.getByTestId('colors').compareSnapshot('css-typography-colors', 0.0)
    cy.getByTestId('styles').compareSnapshot('css-typography-styles', 0.0)
    cy.getByTestId('alignment').compareSnapshot('css-typography-alignment', 0.0)

    cy.platform('mobile')
    cy.getByTestId('display').compareSnapshot('css-typography-display-mobile', 0.0)
    cy.getByTestId('title').compareSnapshot('css-typography-title-mobile', 0.0)
    cy.getByTestId('text').compareSnapshot('css-typography-text-mobile', 0.0)
    cy.getByTestId('alignment').compareSnapshot('css-typography-alignment-mobile', 0.0)
  })
})
