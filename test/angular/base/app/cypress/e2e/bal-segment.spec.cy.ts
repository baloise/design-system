describe('bal-segment', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Segment Label')

    cy.getByTestId('segment').getByRole('label', { name: 'Kiwi' }).click()
    cy.get('body').click(0, 0)

    cy.getByLabelText('Segment Label')
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByTestId('segment').getByRole('label', { name: 'Kiwi' }).click()

    cy.getByLabelText('Segment Label')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Segment' }).click()

    cy.getByRole('button', { name: 'Disable Segment' }).click()
    cy.getByLabelText('Segment Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Segment' }).click()
    cy.getByLabelText('Segment Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"Apple"')
  })
})
