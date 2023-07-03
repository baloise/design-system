describe('bal-logo', () => {
  before(() => {
    cy.visit('/components/bal-logo/test/bal-logo.visual.html').waitForDesignSystem()
  })

  it('basic component', () => {
    cy.platform('desktop').wait(100)
    cy.getByTestId('basic').compareSnapshot('logo-basic-desktop')
    cy.getByTestId('colors').compareSnapshot('logo-colors-desktop')
    cy.getByTestId('colors-inverted').compareSnapshot('logo-colors-inverted-desktop')

    cy.platform('tablet').wait(100)
    cy.getByTestId('basic').compareSnapshot('logo-basic-tablet')
    cy.getByTestId('colors').compareSnapshot('logo-colors-tablet')
    cy.getByTestId('colors-inverted').compareSnapshot('logo-colors-inverted-tablet')

    cy.platform('mobile').wait(100)
    cy.getByTestId('basic').compareSnapshot('logo-basic-mobile')
    cy.getByTestId('colors').compareSnapshot('logo-colors-mobile')
    cy.getByTestId('colors-inverted').compareSnapshot('logo-colors-inverted-mobile')
  })
})
