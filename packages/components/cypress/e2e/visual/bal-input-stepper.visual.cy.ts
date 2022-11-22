describe('bal-input-stepper', () => {
  before(() => cy.page('/components/form/bal-input-stepper/test/bal-input-stepper.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-stepper-basic', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-stepper-basic-mobile', 0.0)
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('input-stepper-disabled', 0.0)

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('input-stepper-disabled-mobile', 0.0)
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('input-stepper-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('input-stepper-invalid-mobile', 0.0)
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('input-stepper-field', 0.0)

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('input-stepper-field-mobile', 0.0)
  })
})
