describe('bal-textarea', () => {
  beforeEach(() => cy.visit('/components/form/bal-textarea/test/bal-textarea.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('textarea-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('textarea-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('textarea-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('textarea-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('textarea-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('textarea-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('textarea-field')

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('textarea-field-mobile')
  })
})
