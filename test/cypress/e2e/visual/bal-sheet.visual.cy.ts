describe('bal-sheet', () => {
  beforeEach(() => cy.visit('/components/bal-sheet/test/bal-sheet.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.testVisual('sheet-basic-desktop')

    cy.platform('tablet')
    cy.testVisual('sheet-basic-tablet')

    cy.platform('mobile')
    cy.testVisual('sheet-basic-mobile')
  })
})
