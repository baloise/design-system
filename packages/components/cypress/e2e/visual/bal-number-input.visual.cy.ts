describe('bal-number-input', () => {
  beforeEach(() =>
    cy.visit('/components/form/bal-number-input/test/bal-number-input.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('number-input-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('number-input-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('number-input-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('number-input-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('number-input-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('number-input-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('number-input-field')

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('number-input-field-mobile')
  })
})
