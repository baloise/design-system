describe('bal-textarea', () => {
  beforeEach(() => cy.visit('/components/bal-textarea/test/bal-textarea.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('textarea-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('textarea-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').testVisual('textarea-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').testVisual('textarea-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').testVisual('textarea-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').testVisual('textarea-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').testVisual('textarea-field')

    cy.platform('mobile')
    cy.getByTestId('field').testVisual('textarea-field-mobile')
  })
})
