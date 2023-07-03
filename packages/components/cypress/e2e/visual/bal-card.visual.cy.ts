describe('bal-card', () => {
  beforeEach(() => cy.visit('/components/bal-card/test/bal-card.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('card-basic-desktop')
    cy.getByTestId('colors').compareSnapshot('card-colors-desktop')
    cy.getByTestId('flat').compareSnapshot('card-flat-desktop')
    cy.getByTestId('square').compareSnapshot('card-square-desktop')
    cy.getByTestId('border').compareSnapshot('card-border-desktop')
    cy.getByTestId('space').compareSnapshot('card-space-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('card-basic-tablet')
    cy.getByTestId('colors').compareSnapshot('card-colors-tablet')
    cy.getByTestId('flat').compareSnapshot('card-flat-tablet')
    cy.getByTestId('square').compareSnapshot('card-square-tablet')
    cy.getByTestId('border').compareSnapshot('card-border-tablet')
    cy.getByTestId('space').compareSnapshot('card-space-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('card-basic-mobile')
    cy.getByTestId('colors').compareSnapshot('card-colors-mobile')
    cy.getByTestId('flat').compareSnapshot('card-flat-mobile')
    cy.getByTestId('square').compareSnapshot('card-square-mobile')
    cy.getByTestId('border').compareSnapshot('card-border-mobile')
    cy.getByTestId('space').compareSnapshot('card-space-mobile')
  })
})
