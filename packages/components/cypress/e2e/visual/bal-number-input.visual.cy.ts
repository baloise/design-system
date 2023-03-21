describe('bal-number-input', () => {
  beforeEach(() =>
    cy.visit('/components/form/bal-number-input/test/bal-number-input.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('number-input-basic', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('number-input-basic-mobile', 0.0)
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('number-input-disabled', 0.0)

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('number-input-disabled-mobile', 0.0)
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('number-input-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('number-input-invalid-mobile', 0.0)
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('number-input-field', 0.0)

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('number-input-field-mobile', 0.0)
  })
})
