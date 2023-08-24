describe('css-flex.visual', () => {
  beforeEach(() => cy.visit('/test/css-flex.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('flex-direction').compareSnapshot('css-flex-flex-direction-desktop')
    cy.getByTestId('flex-wrap').compareSnapshot('css-flex-flex-wrap-desktop')
    cy.getByTestId('justify-content').compareSnapshot('css-flex-justify-content-desktop')
    cy.getByTestId('align-content').compareSnapshot('css-flex-align-content-desktop')
    cy.getByTestId('align-items').compareSnapshot('css-flex-align-items-desktop')
    cy.getByTestId('align-self').compareSnapshot('css-flex-align-self-desktop')
    cy.getByTestId('flex-operators').compareSnapshot('css-flex-operators-desktop')
    cy.getByTestId('flex-gap').compareSnapshot('css-flex-gap-desktop')

    cy.platform('tablet')
    cy.getByTestId('flex-gap').compareSnapshot('css-flex-gap-tablet')

    cy.platform('mobile')
    cy.getByTestId('flex-gap').compareSnapshot('css-flex-gap-mobile')
  })
})
