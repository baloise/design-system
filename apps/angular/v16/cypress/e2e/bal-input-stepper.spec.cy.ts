describe('bal-input-stepper', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Input Stepper Label').should('have.value', 0)

    cy.getByLabelText('Input Stepper Label').getControl('erhöhen').click().blur()
    cy.getByLabelText('Input Stepper Label')
      .should('have.value', 1)
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('Min is 2')

    cy.getByLabelText('Input Stepper Label').getControl('erhöhen').click().blur()

    cy.getByLabelText('Input Stepper Label')
      .should('have.value', 2)
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'Min is 2')

    cy.getByRole('button', { name: 'Disable Input Stepper' }).click()
    cy.getByLabelText('Input Stepper Label').should('be.disabled')
    cy.getByRole('button', { name: 'Enable Input Stepper' }).click()
    cy.getByLabelText('Input Stepper Label').should('not.be.disabled')
    cy.getByTestId('result').contains('"inputStepper": 2')
  })
})
