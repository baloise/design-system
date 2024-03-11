describe('bal-field', () => {
  beforeEach(() => cy.visit('/components/bal-field/test/bal-field.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('field-basic-desktop')
    cy.getByTestId('disabled').testVisual('field-disabled-desktop')
    cy.getByTestId('invalid').testVisual('field-invalid-desktop')
    cy.getByTestId('readonly').testVisual('field-readonly-desktop')
    cy.getByTestId('required').testVisual('field-required-desktop')
    cy.getByTestId('valid').testVisual('field-valid-desktop')
    cy.getByTestId('label-long').testVisual('label-long-desktop')
    cy.getByTestId('label-long-with-hint').testVisual('label-long-with-hint-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('field-basic-tablet')
    cy.getByTestId('disabled').testVisual('field-disabled-tablet')
    cy.getByTestId('invalid').testVisual('field-invalid-tablet')
    cy.getByTestId('readonly').testVisual('field-readonly-tablet')
    cy.getByTestId('required').testVisual('field-required-tablet')
    cy.getByTestId('valid').testVisual('field-valid-tablet')
    cy.getByTestId('label-long').testVisual('label-long-tablet')
    cy.getByTestId('label-long-with-hint').testVisual('label-long-with-hint-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('field-basic-mobile')
    cy.getByTestId('disabled').testVisual('field-disabled-mobile')
    cy.getByTestId('invalid').testVisual('field-invalid-mobile')
    cy.getByTestId('readonly').testVisual('field-readonly-mobile')
    cy.getByTestId('required').testVisual('field-required-mobile')
    cy.getByTestId('valid').testVisual('field-valid-mobile')
    cy.getByTestId('label-long').testVisual('label-long-mobile')
    cy.getByTestId('label-long-with-hint').testVisual('label-long-with-hint-mobile')
  })
})

describe('bal-field-horizontal', () => {
  beforeEach(() => cy.visit('/components/bal-field/test/bal-field-horizontal.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('horizontal').testVisual('horizontal-desktop')
    cy.getByTestId('horizontal-long-label').testVisual('horizontal-long-label-desktop')
    cy.getByTestId('horizontal-with-hint').testVisual('horizontal-with-hint-desktop')

    cy.platform('tablet')
    cy.getByTestId('horizontal').testVisual('horizontal-tablet')
    cy.getByTestId('horizontal-long-label').testVisual('horizontal-long-label-tablet')
    cy.getByTestId('horizontal-with-hint').testVisual('horizontal-with-hint-tablet')

    cy.platform('mobile')
    cy.getByTestId('horizontal').testVisual('horizontal-mobile')
    cy.getByTestId('horizontal-long-label').testVisual('horizontal-long-label-mobile')
    cy.getByTestId('horizontal-with-hint').testVisual('horizontal-with-hint-mobile')
  })
})
