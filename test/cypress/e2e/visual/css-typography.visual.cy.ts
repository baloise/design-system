describe('css-typography.visual', () => {
  beforeEach(() => cy.visit('/test/css-typography.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('display').compareSnapshot('css-typography-display')
    cy.getByTestId('title').compareSnapshot('css-typography-title')
    cy.getByTestId('text').compareSnapshot('css-typography-text')
    cy.getByTestId('colors').compareSnapshot('css-typography-colors')
    cy.getByTestId('styles').compareSnapshot('css-typography-styles')
    cy.getByTestId('alignment').compareSnapshot('css-typography-alignment')

    cy.platform('mobile')
    cy.getByTestId('display').compareSnapshot('css-typography-display-mobile')
    cy.getByTestId('title').compareSnapshot('css-typography-title-mobile')
    cy.getByTestId('text').compareSnapshot('css-typography-text-mobile')
    cy.getByTestId('alignment').compareSnapshot('css-typography-alignment-mobile')
  })
})
