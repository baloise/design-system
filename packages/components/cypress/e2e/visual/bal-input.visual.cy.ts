describe('bal-input', () => {
  beforeEach(() => cy.visit('/components/form/bal-input/test/bal-input.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-basic', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-basic-mobile', 0.0)
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('input-disabled', 0.0)

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('input-disabled-mobile', 0.0)
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('input-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('input-invalid-mobile', 0.0)
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('input-field', 0.0)

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('input-field-mobile', 0.0)
  })

  it('input-date', () => {
    cy.platform('desktop')
    cy.getByTestId('input-date').compareSnapshot('input-date', 0.0)
  })
})
