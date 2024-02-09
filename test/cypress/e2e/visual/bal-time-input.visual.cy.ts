describe('bal-time-input', () => {
  beforeEach(() => cy.visit('/components/bal-time-input/test/bal-time-input.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('time-input-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('time-input-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').testVisual('time-input-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').testVisual('time-input-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').testVisual('time-input-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').testVisual('time-input-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').testVisual('time-input-field')

    cy.platform('mobile')
    cy.getByTestId('field').testVisual('time-input-field-mobile')
  })
})
