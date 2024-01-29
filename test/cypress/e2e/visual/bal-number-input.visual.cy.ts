describe('bal-number-input', () => {
  beforeEach(() =>
    cy.visit('/components/bal-number-input/test/bal-number-input.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('number-input-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('number-input-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').testVisual('number-input-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').testVisual('number-input-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').testVisual('number-input-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').testVisual('number-input-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').testVisual('number-input-field')

    cy.platform('mobile')
    cy.getByTestId('field').testVisual('number-input-field-mobile')
  })
})
