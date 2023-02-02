describe('bal-accordion', () => {
  beforeEach(() => cy.pageA11y('/components/bal-accordion/test/bal-accordion.a11y.html').platform('desktop'))

  it('collapsed', () => {
    cy.getByTestId('accordion').testA11y()
    cy.getByTestId('accordion').click().testA11y()
  })

  it('expanded', () => {
    cy.getByTestId('accordion').click().testA11y()
  })
})
