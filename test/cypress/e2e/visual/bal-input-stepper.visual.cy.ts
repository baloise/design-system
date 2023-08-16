describe('bal-input-stepper', () => {
  beforeEach(() =>
    cy.visit('/components/form/bal-input-stepper/test/bal-input-stepper.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-stepper-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-stepper-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('input-stepper-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('input-stepper-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('input-stepper-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('input-stepper-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('input-stepper-field')

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('input-stepper-field-mobile')
  })
})
