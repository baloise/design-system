describe('bal-card', () => {
  beforeEach(() => cy.visit('/components/bal-card/test/bal-card.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('card-basic-desktop', 0.0)
    cy.getByTestId('colors').compareSnapshot('card-colors-desktop', 0.0)
    cy.getByTestId('flat').compareSnapshot('card-flat-desktop', 0.0)
    cy.getByTestId('square').compareSnapshot('card-square-desktop', 0.0)
    cy.getByTestId('border').compareSnapshot('card-border-desktop', 0.0)
    cy.getByTestId('space').compareSnapshot('card-space-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('card-basic-tablet', 0.0)
    cy.getByTestId('colors').compareSnapshot('card-colors-tablet', 0.0)
    cy.getByTestId('flat').compareSnapshot('card-flat-tablet', 0.0)
    cy.getByTestId('square').compareSnapshot('card-square-tablet', 0.0)
    cy.getByTestId('border').compareSnapshot('card-border-tablet', 0.0)
    cy.getByTestId('space').compareSnapshot('card-space-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('card-basic-mobile', 0.0)
    cy.getByTestId('colors').compareSnapshot('card-colors-mobile', 0.0)
    cy.getByTestId('flat').compareSnapshot('card-flat-mobile', 0.0)
    cy.getByTestId('square').compareSnapshot('card-square-mobile', 0.0)
    cy.getByTestId('border').compareSnapshot('card-border-mobile', 0.0)
    cy.getByTestId('space').compareSnapshot('card-space-mobile', 0.0)
  })
})
