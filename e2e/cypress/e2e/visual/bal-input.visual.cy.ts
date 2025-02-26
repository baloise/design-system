describe('bal-input', () => {
  beforeEach(() => cy.visit('/components/bal-input/test/bal-input.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('input-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('input-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').testVisual('input-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').testVisual('input-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').testVisual('input-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').testVisual('input-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').testVisual('input-field')

    cy.platform('mobile')
    cy.getByTestId('field').testVisual('input-field-mobile')
  })

  it('input-date', () => {
    cy.platform('desktop')
    cy.getByTestId('input-date').testVisual('input-date')
  })
})
