describe('bal-field', () => {
  before(() => cy.page('/components/form/bal-field/test/bal-field.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('field-basic-desktop', 0.0)
    cy.getByTestId('disabled').compareSnapshot('field-disabled-desktop', 0.0)
    cy.getByTestId('invalid').compareSnapshot('field-invalid-desktop', 0.0)
    cy.getByTestId('readonly').compareSnapshot('field-readonly-desktop', 0.0)
    cy.getByTestId('required').compareSnapshot('field-required-desktop', 0.0)
    cy.getByTestId('valid').compareSnapshot('field-valid-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('field-basic-tablet', 0.0)
    cy.getByTestId('disabled').compareSnapshot('field-disabled-tablet', 0.0)
    cy.getByTestId('invalid').compareSnapshot('field-invalid-tablet', 0.0)
    cy.getByTestId('readonly').compareSnapshot('field-readonly-tablet', 0.0)
    cy.getByTestId('required').compareSnapshot('field-required-tablet', 0.0)
    cy.getByTestId('valid').compareSnapshot('field-valid-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('field-basic-mobile', 0.0)
    cy.getByTestId('disabled').compareSnapshot('field-disabled-mobile', 0.0)
    cy.getByTestId('invalid').compareSnapshot('field-invalid-mobile', 0.0)
    cy.getByTestId('readonly').compareSnapshot('field-readonly-mobile', 0.0)
    cy.getByTestId('required').compareSnapshot('field-required-mobile', 0.0)
    cy.getByTestId('valid').compareSnapshot('field-valid-mobile', 0.0)
  })
})
