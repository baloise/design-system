describe('bal-hint', () => {
  before(() => {
    cy.visit('/components/bal-hint/test/bal-hint.visual.html').waitForDesignSystem()
  })

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('hint-basic-desktop')
    cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-desktop')
    cy.getByTestId('basic').balHintFindCloseButton().click()
    cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('hint-basic-tablet')
    cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-tablet')
    cy.getByTestId('basic').balHintFindCloseButton().click()
    cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-tablet')
    cy.getByTestId('small').click(0, 0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('hint-basic-mobile')
    cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-mobile')
    cy.getByTestId('basic').balHintFindCloseButton().click()
    cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-mobile')
  })
})
