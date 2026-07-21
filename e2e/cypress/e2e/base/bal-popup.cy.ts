describe('bal-popup', () => {
  beforeEach(() => {
    cy.visit('/components/bal-popup/test/bal-popup.cy.html')
    cy.waitForDesignSystem()
  })

  it('should open and close the popup', () => {
    cy.getByTestId('popup').balPopupIsClosed()
    cy.getByTestId('popup-trigger').click()
    cy.getByTestId('popup').balPopupIsOpen()
    cy.getByTestId('popup-trigger').click()
    cy.getByTestId('popup').balPopupIsClosed()
  })

  it('should contain trigger and menu content', () => {
    cy.getByTestId('popup-trigger').click()
    cy.getByTestId('popup').contains('TEST CONTENT')
  })
})
