describe('bal-date-calendar', () => {
  beforeEach(() => cy.visit('/components/form/bal-date/test/bal-date-calendar.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('default-date').compareSnapshot('default-date-desktop')
    cy.getByTestId('value').compareSnapshot('value-desktop')
    cy.getByTestId('min-and-max').compareSnapshot('min-and-max-desktop')
    cy.getByTestId('year').compareSnapshot('year-desktop')
  })
})
