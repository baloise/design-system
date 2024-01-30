describe('css-typography.visual', () => {
  beforeEach(() => cy.visit('/test/css-typography.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('display').testVisual('css-typography-display')
    cy.getByTestId('title').testVisual('css-typography-title')
    cy.getByTestId('text').testVisual('css-typography-text')
    cy.getByTestId('colors').testVisual('css-typography-colors')
    cy.getByTestId('styles').testVisual('css-typography-styles')
    cy.getByTestId('alignment').testVisual('css-typography-alignment')

    cy.platform('mobile')
    cy.getByTestId('display').testVisual('css-typography-display-mobile')
    cy.getByTestId('title').testVisual('css-typography-title-mobile')
    cy.getByTestId('text').testVisual('css-typography-text-mobile')
    cy.getByTestId('alignment').testVisual('css-typography-alignment-mobile')
  })
})

describe('deprecated-css-typography.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-typography.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('display').testVisual('css-typography-display')
    cy.getByTestId('title').testVisual('css-typography-title')
    cy.getByTestId('text').testVisual('css-typography-text')
    cy.getByTestId('colors').testVisual('css-typography-colors')
    cy.getByTestId('styles').testVisual('css-typography-styles')
    cy.getByTestId('alignment').testVisual('css-typography-alignment')

    cy.platform('mobile')
    cy.getByTestId('display').testVisual('css-typography-display-mobile')
    cy.getByTestId('title').testVisual('css-typography-title-mobile')
    cy.getByTestId('text').testVisual('css-typography-text-mobile')
    cy.getByTestId('alignment').testVisual('css-typography-alignment-mobile')
  })
})
