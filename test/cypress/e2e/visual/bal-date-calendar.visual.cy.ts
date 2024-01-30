describe('bal-date-calendar', () => {
  beforeEach(() => cy.visit('/components/bal-date/test/bal-date-calendar.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('default-date').testVisual('default-date-desktop')
    cy.getByTestId('value').testVisual('value-desktop')
    cy.getByTestId('min-and-max').testVisual('min-and-max-desktop')
    cy.getByTestId('year').testVisual('year-desktop')
  })
})
