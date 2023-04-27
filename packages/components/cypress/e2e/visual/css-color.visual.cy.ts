describe('css-typography.visual', () => {
  beforeEach(() => cy.visit('/test/css-background-colors.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-background-colors-basic', 0.0)
    cy.getByTestId('grey').compareSnapshot('css-background-colors-grey', 0.0)
    cy.getByTestId('blue').compareSnapshot('css-background-colors-blue', 0.0)
    cy.getByTestId('light-blue').compareSnapshot('css-background-colors-light-blue', 0.0)
    cy.getByTestId('purple').compareSnapshot('css-background-colors-purple', 0.0)
    cy.getByTestId('green').compareSnapshot('css-background-colors-green', 0.0)
    cy.getByTestId('yellow').compareSnapshot('css-background-colors-yellow', 0.0)
    cy.getByTestId('red').compareSnapshot('css-background-colors-red', 0.0)
    cy.getByTestId('info').compareSnapshot('css-background-colors-info', 0.0)
    cy.getByTestId('success').compareSnapshot('css-background-colors-success', 0.0)
    cy.getByTestId('warning').compareSnapshot('css-background-colors-warning', 0.0)
    cy.getByTestId('danger').compareSnapshot('css-background-colors-danger', 0.0)
    cy.getByTestId('primary').compareSnapshot('css-background-colors-primary', 0.0)
  })
})
