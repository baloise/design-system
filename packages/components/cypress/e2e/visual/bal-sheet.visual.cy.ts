describe('bal-sheet', () => {
  before(() => cy.page('/components/notice/bal-sheet/test/bal-sheet.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.compareSnapshot('sheet-basic-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('sheet-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('sheet-basic-mobile', 0.0)
  })
})
