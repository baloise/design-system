describe('bal-sheet', () => {
  beforeEach(() => cy.visit('/components/notice/bal-sheet/test/bal-sheet.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.compareSnapshot('sheet-basic-desktop')

    cy.platform('tablet')
    cy.compareSnapshot('sheet-basic-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('sheet-basic-mobile')
  })
})
