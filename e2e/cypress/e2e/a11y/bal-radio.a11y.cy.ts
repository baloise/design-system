describe('bal-radio', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-radio/test/bal-radio.a11y.html'))

    describe('have the AA standard', () => {
      it('radio basic', () => {
        cy.getByTestId('radio-basic').testA11y()
        cy.getByTestId('basic-label-hidden').testA11y()
        cy.getByTestId('disabled').testA11y()
        cy.getByTestId('invalid').testA11y()
      })

      it('select button', () => {
        cy.getByTestId('select-button-basic').testA11y()
        cy.getByTestId('select-button-invalid').testA11y()
        cy.getByTestId('select-button-disabled').testA11y()
      })
    })
  })
})
