describe('css-color.visual', () => {
  beforeEach(() => cy.visit('/test/css-color.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-background-color-basic', 0.0)
    cy.getByTestId('grey').compareSnapshot('css-background-color-grey', 0.0)
    cy.getByTestId('blue').compareSnapshot('css-background-color-blue', 0.0)
    cy.getByTestId('light-blue').compareSnapshot('css-background-color-light-blue', 0.0)
    cy.getByTestId('purple').compareSnapshot('css-background-color-purple', 0.0)
    cy.getByTestId('green').compareSnapshot('css-background-color-green', 0.0)
    cy.getByTestId('yellow').compareSnapshot('css-background-color-yellow', 0.0)
    cy.getByTestId('red').compareSnapshot('css-background-color-red', 0.0)
    cy.getByTestId('info').compareSnapshot('css-background-color-info', 0.0)
    cy.getByTestId('success').compareSnapshot('css-background-color-success', 0.0)
    cy.getByTestId('warning').compareSnapshot('css-background-color-warning', 0.0)
    cy.getByTestId('danger').compareSnapshot('css-background-color-danger', 0.0)
    cy.getByTestId('primary').compareSnapshot('css-background-color-primary', 0.0)
  })
})
