describe('bal-time-input', () => {
  beforeEach(() => cy.visit('/components/bal-time-input/test/bal-time-input.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('time-input-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('time-input-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('time-input-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('time-input-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('time-input-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('time-input-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('time-input-field')

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('time-input-field-mobile')
  })
})
