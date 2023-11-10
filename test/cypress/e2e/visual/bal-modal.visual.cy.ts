describe('bal-modal', () => {
  it('basic component', () => {
    cy.visit('/components/bal-modal/test/bal-modal.visual.html')
    cy.platform('desktop')
    cy.getByTestId('open-modal-button').click()
    cy.compareSnapshot('modal-basic')

    cy.visit('/components/bal-modal/test/bal-modal.visual.html')
    cy.platform('mobile')
    cy.getByTestId('open-modal-button').click()
    cy.compareSnapshot('modal-basic-mobile')
  })
})
