describe('bal-hint', () => {
  before(() => {
    cy.visit('/components/bal-hint/test/bal-hint.visual.html').waitForDesignSystem()
  })

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('hint-basic-desktop', 0.0)
    cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-desktop', 0.0)
    cy.getByTestId('basic').balHintFindCloseButton().click()
    cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('hint-basic-tablet', 0.0)
    cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-tablet', 0.0)
    cy.getByTestId('basic').balHintFindCloseButton().click()
    cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-tablet', 0.0)
    cy.getByTestId('small').click(0, 0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('hint-basic-mobile', 0.0)
    cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-mobile', 0.0)
    cy.getByTestId('basic').balHintFindCloseButton().click()
    cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-mobile', 0.0)
  })
})
