describe('bal-time-input', () => {
  beforeEach(() => cy.page('/components/form/bal-time-input/test/bal-time-input.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('time-input-basic', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('time-input-basic-mobile', 0.0)
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('time-input-disabled', 0.0)

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('time-input-disabled-mobile', 0.0)
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('time-input-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('time-input-invalid-mobile', 0.0)
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('time-input-field', 0.0)

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('time-input-field-mobile', 0.0)
  })
})
