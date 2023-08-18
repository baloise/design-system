describe('bal-checkbox', () => {
  beforeEach(() => cy.visit('/components/form/bal-checkbox/test/bal-checkbox.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('checkbox-basic-desktop')
    cy.getByTestId('checked').compareSnapshot('checkbox-checked-desktop')
    cy.getByTestId('invalid').compareSnapshot('checkbox-invalid-desktop')
    cy.getByTestId('disabled').compareSnapshot('checkbox-disabled-desktop')
    cy.getByTestId('flat').compareSnapshot('checkbox-flat-desktop')
    cy.getByTestId('label-hidden').compareSnapshot('checkbox-label-hidden-desktop')
    cy.getByTestId('select-button').compareSnapshot('checkbox-select-button-desktop')
    cy.getByTestId('switch').compareSnapshot('checkbox-switch-desktop')
    cy.getByTestId('vertical').compareSnapshot('checkbox-vertical-desktop')
    cy.getByTestId('vertical-on-mobile').compareSnapshot('checkbox-vertical-on-mobile-desktop')
    cy.getByTestId('long-label').compareSnapshot('checkbox-long-label-desktop')
    cy.getByTestId('long-label-select-button').compareSnapshot('checkbox-long-label-select-button-desktop')
    cy.getByTestId('long-label-checked').compareSnapshot('checkbox-long-label-checked-desktop')
    cy.getByTestId('long-label-select-button-checked').compareSnapshot(
      'checkbox-long-label-select-button-checked-desktop',
      0.0,
    )

    cy.platform('tablet')
    cy.getByTestId('vertical-on-mobile').compareSnapshot('checkbox-vertical-on-mobile-tablet')

    cy.platform('mobile')
    cy.getByTestId('vertical-on-mobile').compareSnapshot('checkbox-vertical-on-mobile-mobile')
  })
})
