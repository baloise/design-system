describe('bal-modal', () => {
  it('basic component', () => {
    cy.page('/components/notice/bal-modal/test/bal-modal.visual.html')
    cy.platform('desktop')
    cy.getByTestId('open-modal-button').click()
    cy.compareSnapshot('modal-basic', 0.0)

    cy.page('/components/notice/bal-modal/test/bal-modal.visual.html')
    cy.platform('mobile')
    cy.getByTestId('open-modal-button').click()
    cy.compareSnapshot('modal-basic-mobile', 0.0)
  })
})
