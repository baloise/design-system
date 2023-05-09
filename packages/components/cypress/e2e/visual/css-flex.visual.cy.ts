describe('css-flex.visual', () => {
  beforeEach(() => cy.visit('/test/css-flex.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('flex-direction').compareSnapshot('css-flex-flex-direction-desktop', 0.0)
    cy.getByTestId('flex-wrap').compareSnapshot('css-flex-flex-wrap-desktop', 0.0)
    cy.getByTestId('justify-content').compareSnapshot('css-flex-justify-content-desktop', 0.0)
    cy.getByTestId('align-content').compareSnapshot('css-flex-align-content-desktop', 0.0)
    cy.getByTestId('align-items').compareSnapshot('css-flex-align-items-desktop', 0.0)
    cy.getByTestId('align-self').compareSnapshot('css-flex-align-self-desktop', 0.0)
    cy.getByTestId('flex-operators').compareSnapshot('css-flex-operators-desktop', 0.0)
    cy.getByTestId('flex-gap').compareSnapshot('css-flex-gap-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('flex-gap').compareSnapshot('css-flex-gap-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('flex-gap').compareSnapshot('css-flex-gap-mobile', 0.0)
  })
})
