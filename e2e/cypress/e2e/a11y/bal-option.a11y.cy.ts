describe('bal-option', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-option/test/bal-option.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => cy.getByTestId('basic').testA11y())
      it('selected', () => cy.getByTestId('selected').testA11y())
      it('focused', () => cy.getByTestId('focused').testA11y())
      it('invalid', () => cy.getByTestId('invalid').testA11y())
      it('disabled', () => cy.getByTestId('disabled').testA11y())
    })
  })
})
