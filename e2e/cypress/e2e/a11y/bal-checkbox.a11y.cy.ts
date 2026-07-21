describe('bal-checkbox', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-checkbox/test/bal-checkbox.a11y.html'))

    describe('have the AA standard', () => {
      it('checkbox basic', () => {
        cy.getByTestId('checkbox-basic').testA11y()
        cy.getByTestId('group').testA11y()
        cy.getByTestId('checked').testA11y()
        cy.getByTestId('basic-label-hidden').testA11y()
        cy.getByTestId('disabled').testA11y()
        cy.getByTestId('invalid').testA11y()
      })

      it('select button', () => {
        cy.getByTestId('button-basic').testA11y()
        cy.getByTestId('button-group').testA11y()
        cy.getByTestId('button-checked').testA11y()
        cy.getByTestId('button-label-hidden').testA11y()
        cy.getByTestId('button-invalid').testA11y()
        cy.getByTestId('button-disabled').testA11y()
      })

      it('switch basic', () => {
        cy.getByTestId('switch-basic').testA11y()
        cy.getByTestId('switch-group').testA11y()
        cy.getByTestId('switch-checked').testA11y()
        cy.getByTestId('switch-label-hidden').testA11y()
        cy.getByTestId('switch-invalid').testA11y()
        cy.getByTestId('switch-disabled').testA11y()
      })
    })
  })
})
