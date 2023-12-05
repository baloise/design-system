describe('bal-field', () => {
  beforeEach(() => cy.visit('/components/bal-field/test/bal-field.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('field-basic-desktop')
    cy.getByTestId('disabled').compareSnapshot('field-disabled-desktop')
    cy.getByTestId('invalid').compareSnapshot('field-invalid-desktop')
    cy.getByTestId('readonly').compareSnapshot('field-readonly-desktop')
    cy.getByTestId('required').compareSnapshot('field-required-desktop')
    cy.getByTestId('valid').compareSnapshot('field-valid-desktop')
    cy.getByTestId('label-long').compareSnapshot('label-long-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('field-basic-tablet')
    cy.getByTestId('disabled').compareSnapshot('field-disabled-tablet')
    cy.getByTestId('invalid').compareSnapshot('field-invalid-tablet')
    cy.getByTestId('readonly').compareSnapshot('field-readonly-tablet')
    cy.getByTestId('required').compareSnapshot('field-required-tablet')
    cy.getByTestId('valid').compareSnapshot('field-valid-tablet')
    cy.getByTestId('label-long').compareSnapshot('label-long-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('field-basic-mobile')
    cy.getByTestId('disabled').compareSnapshot('field-disabled-mobile')
    cy.getByTestId('invalid').compareSnapshot('field-invalid-mobile')
    cy.getByTestId('readonly').compareSnapshot('field-readonly-mobile')
    cy.getByTestId('required').compareSnapshot('field-required-mobile')
    cy.getByTestId('valid').compareSnapshot('field-valid-mobile')
    cy.getByTestId('label-long').compareSnapshot('label-long-mobile')
  })
})

describe('bal-field-horizontal', () => {
  beforeEach(() => cy.visit('/components/bal-field/test/bal-field-horizontal.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('horizontal').compareSnapshot('horizontal-desktop')
    cy.getByTestId('horizontal-long-label').compareSnapshot('horizontal-long-label-desktop')
    cy.getByTestId('horizontal-with-hint').compareSnapshot('horizontal-with-hint-desktop')

    cy.platform('tablet')
    cy.getByTestId('horizontal').compareSnapshot('horizontal-tablet')
    cy.getByTestId('horizontal-long-label').compareSnapshot('horizontal-long-label-tablet')
    cy.getByTestId('horizontal-with-hint').compareSnapshot('horizontal-with-hint-tablet')

    cy.platform('mobile')
    cy.getByTestId('horizontal').compareSnapshot('horizontal-mobile')
    cy.getByTestId('horizontal-long-label').compareSnapshot('horizontal-long-label-mobile')
    cy.getByTestId('horizontal-with-hint').compareSnapshot('horizontal-with-hint-mobile')
  })
})
