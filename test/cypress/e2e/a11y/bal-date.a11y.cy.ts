describe('bal-date', () => {
  beforeEach(() => {
    cy.pageA11y('/components/form/bal-date/test/bal-date.a11y.html')
  })

  it('basic', () => {
    cy.get('bal-field').testA11y()
  })
})
