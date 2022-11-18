describe('bal-textarea', () => {
  before(() => cy.page('/components/form/bal-textarea/test/bal-textarea.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('textarea-basic', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('textarea-basic-mobile', 0.0)
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('textarea-disabled', 0.0)

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('textarea-disabled-mobile', 0.0)
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('textarea-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('textarea-invalid-mobile', 0.0)
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('textarea-field', 0.0)

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('textarea-field-mobile', 0.0)
  })
})
