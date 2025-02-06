describe('css-display.visual', () => {
  beforeEach(() => cy.visit('/test/css-display.visual.html').platform('desktop'))

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('display-block').testVisual('css-display-block-desktop')
    cy.getByTestId('display-flex').testVisual('css-display-flex-desktop')
    cy.getByTestId('display-inline').testVisual('css-display-inline-desktop')
    cy.getByTestId('display-inline-block').testVisual('css-display-inline-block-desktop')
    cy.getByTestId('display-inline-flex').testVisual('css-display-inline-flex-desktop')
    cy.getByTestId('hidden').testVisual('css-display-hidden-desktop')

    cy.platform('tablet')
    cy.getByTestId('display-block').testVisual('css-display-block-tablet')
    cy.getByTestId('display-flex').testVisual('css-display-flex-tablet')
    cy.getByTestId('display-inline').testVisual('css-display-inline-tablet')
    cy.getByTestId('display-inline-block').testVisual('css-display-inline-block-tablet')
    cy.getByTestId('display-inline-flex').testVisual('css-display-inline-flex-tablet')
    cy.getByTestId('hidden').testVisual('css-display-hidden-tablet')

    cy.platform('mobile')
    cy.getByTestId('display-block').testVisual('css-display-block-mobile')
    cy.getByTestId('display-flex').testVisual('css-display-flex-mobile')
    cy.getByTestId('display-inline').testVisual('css-display-inline-mobile')
    cy.getByTestId('display-inline-block').testVisual('css-display-inline-block-mobile')
    cy.getByTestId('display-inline-flex').testVisual('css-display-inline-flex-mobile')
    cy.getByTestId('hidden').testVisual('css-display-hidden-mobile')
  })
})
