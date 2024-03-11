describe('bal-input-stepper', () => {
  beforeEach(() =>
    cy.visit('/components/bal-input-stepper/test/bal-input-stepper.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('input-stepper-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('input-stepper-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').testVisual('input-stepper-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').testVisual('input-stepper-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').testVisual('input-stepper-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').testVisual('input-stepper-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').testVisual('input-stepper-field')

    cy.platform('mobile')
    cy.getByTestId('field').testVisual('input-stepper-field-mobile')
  })
})
