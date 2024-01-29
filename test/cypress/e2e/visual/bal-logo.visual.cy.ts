describe('bal-logo', () => {
  before(() => {
    cy.visit('/components/bal-logo/test/bal-logo.visual.html').waitForDesignSystem()
  })

  it('basic component', () => {
    cy.platform('desktop').wait(100)
    cy.getByTestId('basic').testVisual('logo-basic-desktop')
    cy.getByTestId('colors').testVisual('logo-colors-desktop')
    cy.getByTestId('colors-inverted').testVisual('logo-colors-inverted-desktop')

    cy.platform('tablet').wait(100)
    cy.getByTestId('basic').testVisual('logo-basic-tablet')
    cy.getByTestId('colors').testVisual('logo-colors-tablet')
    cy.getByTestId('colors-inverted').testVisual('logo-colors-inverted-tablet')

    cy.platform('mobile').wait(100)
    cy.getByTestId('basic').testVisual('logo-basic-mobile')
    cy.getByTestId('colors').testVisual('logo-colors-mobile')
    cy.getByTestId('colors-inverted').testVisual('logo-colors-inverted-mobile')
  })
})
