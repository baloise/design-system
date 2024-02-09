describe('bal-input', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-input/test/bal-input.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('with value', () => {
        cy.getByTestId('with-value').testA11y()
      })

      it('invalid', () => {
        cy.getByTestId('invalid').testA11y()
      })

      it('disabled', () => {
        cy.getByTestId('disabled').testA11y()
      })
    })
  })
})
