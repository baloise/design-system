describe('bal-modal', () => {
  before(() => cy.page('/components/notice/bal-modal/test/bal-modal.cy.html'))

  it('should open and close Modal 1', () => {
    cy.getByTestId('open-modal-button').click()
    cy.getByTestId('modal').balModalIsOpen()
    cy.getByTestId('open-modal-close').click()
  })

  it('should open and close Modal 2', () => {
    cy.getByTestId('open-modal-button').click()
    cy.getByTestId('modal').balModalIsOpen()
    cy.getByTestId('modal').balModalClose()
    cy.getByTestId('modal').balModalIsClosed()
  })

  it('should contain title', () => {
    cy.getByTestId('open-modal-button').click()
    cy.getByTestId('modal').find('bal-modal-header').contains('Modal Title')
    cy.getByTestId('modal').contains('Modal Title')
  })
})
