describe('bal-checkbox', () => {
  beforeEach(() => cy.visit('/components/bal-checkbox/test/bal-checkbox.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('checkbox-basic-desktop')
    cy.getByTestId('checked').testVisual('checkbox-checked-desktop')
    cy.getByTestId('invalid').testVisual('checkbox-invalid-desktop')
    cy.getByTestId('disabled').testVisual('checkbox-disabled-desktop')
    cy.getByTestId('flat').testVisual('checkbox-flat-desktop')
    cy.getByTestId('label-hidden').testVisual('checkbox-label-hidden-desktop')
    cy.getByTestId('select-button').testVisual('checkbox-select-button-desktop')
    cy.getByTestId('switch').testVisual('checkbox-switch-desktop')
    cy.getByTestId('vertical').testVisual('checkbox-vertical-desktop')
    cy.getByTestId('vertical-on-mobile').testVisual('checkbox-vertical-on-mobile-desktop')
    cy.getByTestId('long-label').testVisual('checkbox-long-label-desktop')
    cy.getByTestId('long-label-select-button').testVisual('checkbox-long-label-select-button-desktop')
    cy.getByTestId('long-label-checked').testVisual('checkbox-long-label-checked-desktop')
    cy.getByTestId('long-label-select-button-checked').testVisual(
      'checkbox-long-label-select-button-checked-desktop',
      0.0,
    )
    cy.getByTestId('select-buttons-vertical').compareSnapshot('checkbox-select-buttons-vertical-desktop')

    cy.platform('tablet')
    cy.getByTestId('vertical-on-mobile').testVisual('checkbox-vertical-on-mobile-tablet')

    cy.platform('mobile')
    cy.getByTestId('vertical-on-mobile').testVisual('checkbox-vertical-on-mobile-mobile')
  })
})
