describe('bal-checkbox', () => {
  before(() => cy.page('/components/form/bal-checkbox/test/bal-checkbox.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('checkbox-basic-desktop', 0.0)
    cy.getByTestId('checked').compareSnapshot('checkbox-checked-desktop', 0.0)
    cy.getByTestId('invalid').compareSnapshot('checkbox-invalid-desktop', 0.0)
    cy.getByTestId('disabled').compareSnapshot('checkbox-disabled-desktop', 0.0)
    cy.getByTestId('flat').compareSnapshot('checkbox-flat-desktop', 0.0)
    cy.getByTestId('label-hidden').compareSnapshot('checkbox-label-hidden-desktop', 0.0)
    cy.getByTestId('select-button').compareSnapshot('checkbox-select-button-desktop', 0.0)
    cy.getByTestId('switch').compareSnapshot('checkbox-switch-desktop', 0.0)
    cy.getByTestId('vertical').compareSnapshot('checkbox-vertical-desktop', 0.0)
    cy.getByTestId('vertical-on-mobile').compareSnapshot('checkbox-vertical-on-mobile-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('vertical-on-mobile').compareSnapshot('checkbox-vertical-on-mobile-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('vertical-on-mobile').compareSnapshot('checkbox-vertical-on-mobile-mobile', 0.0)
  })
})
