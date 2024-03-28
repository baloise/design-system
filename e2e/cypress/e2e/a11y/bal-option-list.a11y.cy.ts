describe('bal-option-list', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-option-list/test/bal-option-list.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => cy.getByTestId('basic').testA11y())
    })
  })
})
