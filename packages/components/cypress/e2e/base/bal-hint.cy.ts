describe('bal-hint', () => {
  beforeEach(() => {
    cy.visit('/components/bal-hint/test/bal-hint.cy.html')
    cy.waitForDesignSystem()
  })

  it('should open and close the hint overlay', () => {
    cy.getByTestId('hint').balHintFindOverlay().should('not.be.visible')
    cy.getByTestId('hint').click().balHintFindOverlay().should('be.visible')
    cy.getByTestId('hint').balHintFindCloseButton().contains('Schliessen').click()
    cy.getByTestId('hint').balHintFindOverlay().should('not.be.visible')
  })

  it('should contain spider man in the overlay', () => {
    cy.getByTestId('hint').click().balHintFindOverlay().contains('Spider-Man')
    cy.get('body').click()
  })

  it('should contain spider man in the overlay', () => {
    cy.getByTestId('data-hint').click().balHintFindOverlay().contains('Spider-Man')
    cy.get('body').click()
  })

  it('should contain spider man in the overlay', () => {
    cy.getByTestId('field-hint').balFieldFindHint().click().balHintFindOverlay().contains('Spider-Man')
    cy.get('body').click()
  })
})
