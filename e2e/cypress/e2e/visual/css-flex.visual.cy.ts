describe('css-flex.visual', () => {
  beforeEach(() => cy.visit('/test/css-flex.visual.html').platform('desktop'))

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('flex-direction').testVisual('css-flex-flex-direction-desktop')
    cy.getByTestId('flex-wrap').testVisual('css-flex-flex-wrap-desktop')
    cy.getByTestId('justify-content').testVisual('css-flex-justify-content-desktop')
    cy.getByTestId('align-content').testVisual('css-flex-align-content-desktop')
    cy.getByTestId('align-items').testVisual('css-flex-align-items-desktop')
    cy.getByTestId('align-self').testVisual('css-flex-align-self-desktop')
    cy.getByTestId('flex-operators').testVisual('css-flex-operators-desktop')
    cy.getByTestId('flex-gap').testVisual('css-flex-gap-desktop')

    cy.platform('tablet')
    cy.getByTestId('flex-gap').testVisual('css-flex-gap-tablet')

    cy.platform('mobile')
    cy.getByTestId('flex-gap').testVisual('css-flex-gap-mobile')
  })
})

describe('deprecated-css-flex.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-flex.visual.html').platform('desktop'))

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('flex-direction').testVisual('css-flex-flex-direction-desktop')
    cy.getByTestId('flex-wrap').testVisual('css-flex-flex-wrap-desktop')
    cy.getByTestId('justify-content').testVisual('css-flex-justify-content-desktop')
    cy.getByTestId('align-content').testVisual('css-flex-align-content-desktop')
    cy.getByTestId('align-items').testVisual('css-flex-align-items-desktop')
    cy.getByTestId('align-self').testVisual('css-flex-align-self-desktop')
    cy.getByTestId('flex-operators').testVisual('css-flex-operators-desktop')
    cy.getByTestId('flex-gap').testVisual('css-flex-gap-desktop')

    cy.platform('tablet')
    cy.getByTestId('flex-gap').testVisual('css-flex-gap-tablet')

    cy.platform('mobile')
    cy.getByTestId('flex-gap').testVisual('css-flex-gap-mobile')
  })
})
