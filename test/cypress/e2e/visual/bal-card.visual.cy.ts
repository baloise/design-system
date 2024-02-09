describe('bal-card', () => {
  beforeEach(() => cy.visit('/components/bal-card/test/bal-card.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('card-basic-desktop')
    cy.getByTestId('colors').testVisual('card-colors-desktop')
    cy.getByTestId('flat').testVisual('card-flat-desktop')
    cy.getByTestId('square').testVisual('card-square-desktop')
    cy.getByTestId('border').testVisual('card-border-desktop')
    cy.getByTestId('space').testVisual('card-space-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('card-basic-tablet')
    cy.getByTestId('colors').testVisual('card-colors-tablet')
    cy.getByTestId('flat').testVisual('card-flat-tablet')
    cy.getByTestId('square').testVisual('card-square-tablet')
    cy.getByTestId('border').testVisual('card-border-tablet')
    cy.getByTestId('space').testVisual('card-space-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('card-basic-mobile')
    cy.getByTestId('colors').testVisual('card-colors-mobile')
    cy.getByTestId('flat').testVisual('card-flat-mobile')
    cy.getByTestId('square').testVisual('card-square-mobile')
    cy.getByTestId('border').testVisual('card-border-mobile')
    cy.getByTestId('space').testVisual('card-space-mobile')
  })
})
