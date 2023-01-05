describe('bal-accordion', () => {
  beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-accordion/test/bal-accordion.a11y.html'))

  it('collapsed', () => {
    cy.getByTestId('accordion').testA11y()
    cy.getByTestId('accordion').click().testA11y()
  })

  it('expanded', () => {
    cy.getByTestId('accordion').click().testA11y()
  })
})
