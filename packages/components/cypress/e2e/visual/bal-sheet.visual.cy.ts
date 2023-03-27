describe('bal-sheet', () => {
  beforeEach(() => cy.visit('/components/notice/bal-sheet/test/bal-sheet.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.compareSnapshot('sheet-basic-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('sheet-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('sheet-basic-mobile', 0.0)
  })
})
