describe('bal-checkbox', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-checkbox/test/bal-checkbox.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('checked', () => {
        cy.getByTestId('checked').testA11y()
      })

      it('label hidden', () => {
        cy.getByTestId('label-hidden').testA11y()
      })

      it('disabled', () => {
        cy.getByTestId('disabled').testA11y()
      })

      it('invalid', () => {
        cy.getByTestId('invalid').testA11y()
      })
    })
  })
})
