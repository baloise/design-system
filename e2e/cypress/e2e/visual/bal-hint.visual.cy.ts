describe('bal-hint', () => {
  beforeEach(() => {
    cy.visit('/components/bal-hint/test/bal-hint.visual.html').waitForDesignSystem()
  })

  context('desktop', () => {
    beforeEach(() => cy.platform('desktop'))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('hint-basic-desktop')
      cy.getByTestId('basic').click().balHintFindOverlay().testVisual('hint-basic-open-desktop')
      cy.getByTestId('basic').balHintFindCloseButton().click()
      cy.getByTestId('small').click().balHintFindOverlay().testVisual('hint-small-desktop')
    })
  })

  context('tablet', () => {
    beforeEach(() => cy.platform('tablet'))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('hint-basic-tablet')
      cy.getByTestId('basic').click().balHintFindOverlay().testVisual('hint-basic-open-tablet')
      cy.getByTestId('basic').balHintFindCloseButton().click()
      cy.getByTestId('small').click().balHintFindOverlay().testVisual('hint-small-tablet')
    })
  })

  context('mobile', () => {
    beforeEach(() => cy.platform('mobile').wait(200))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('hint-basic-mobile')
      cy.getByTestId('basic').click().balHintFindOverlay().testVisual('hint-basic-open-mobile')
      cy.getByTestId('basic').balHintFindCloseButton().click()
      cy.getByTestId('small').click().balHintFindOverlay().testVisual('hint-small-mobile')
    })
  })
})
