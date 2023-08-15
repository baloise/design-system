describe('bal-hint', () => {
  beforeEach(() => {
    cy.visit('/components/bal-hint/test/bal-hint.visual.html').waitForDesignSystem()
  })

  context('desktop', () => {
    beforeEach(() => cy.platform('desktop'))

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('hint-basic-desktop')
      cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-desktop')
      cy.getByTestId('basic').balHintFindCloseButton().click()
      cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-desktop')
    })
  })

  context('tablet', () => {
    beforeEach(() => cy.platform('tablet'))

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('hint-basic-tablet')
      cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-tablet')
      cy.getByTestId('basic').balHintFindCloseButton().click()
      cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-tablet')
    })
  })

  context('mobile', () => {
    beforeEach(() => cy.platform('mobile').wait(100))

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('hint-basic-mobile')
      cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-mobile')
      cy.getByTestId('basic').balHintFindCloseButton().click()
      cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-mobile')
    })
  })
})
