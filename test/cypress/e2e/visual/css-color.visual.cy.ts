describe('css-color.visual', () => {
  beforeEach(() => cy.visit('/test/css-color.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-background-color-basic')
    cy.getByTestId('grey').compareSnapshot('css-background-color-grey')
    cy.getByTestId('blue').compareSnapshot('css-background-color-blue')
    cy.getByTestId('light-blue').compareSnapshot('css-background-color-light-blue')
    cy.getByTestId('purple').compareSnapshot('css-background-color-purple')
    cy.getByTestId('green').compareSnapshot('css-background-color-green')
    cy.getByTestId('yellow').compareSnapshot('css-background-color-yellow')
    cy.getByTestId('red').compareSnapshot('css-background-color-red')
    cy.getByTestId('info').compareSnapshot('css-background-color-info')
    cy.getByTestId('success').compareSnapshot('css-background-color-success')
    cy.getByTestId('warning').compareSnapshot('css-background-color-warning')
    cy.getByTestId('danger').compareSnapshot('css-background-color-danger')
    cy.getByTestId('primary').compareSnapshot('css-background-color-primary')
  })
})

describe('deprecated/css-color.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-color.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-background-color-basic')
    cy.getByTestId('grey').compareSnapshot('css-background-color-grey')
    cy.getByTestId('blue').compareSnapshot('css-background-color-blue')
    cy.getByTestId('light-blue').compareSnapshot('css-background-color-light-blue')
    cy.getByTestId('purple').compareSnapshot('css-background-color-purple')
    cy.getByTestId('green').compareSnapshot('css-background-color-green')
    cy.getByTestId('yellow').compareSnapshot('css-background-color-yellow')
    cy.getByTestId('red').compareSnapshot('css-background-color-red')
    cy.getByTestId('info').compareSnapshot('css-background-color-info')
    cy.getByTestId('success').compareSnapshot('css-background-color-success')
    cy.getByTestId('warning').compareSnapshot('css-background-color-warning')
    cy.getByTestId('danger').compareSnapshot('css-background-color-danger')
    cy.getByTestId('primary').compareSnapshot('css-background-color-primary')
  })
})
