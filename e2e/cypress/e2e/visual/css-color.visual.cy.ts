describe('css-color.visual', () => {
  beforeEach(() => cy.visit('/test/css-color.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').testVisual('css-background-color-basic')
    cy.getByTestId('grey').testVisual('css-background-color-grey')
    cy.getByTestId('blue').testVisual('css-background-color-blue')
    cy.getByTestId('light-blue').testVisual('css-background-color-light-blue')
    cy.getByTestId('purple').testVisual('css-background-color-purple')
    cy.getByTestId('green').testVisual('css-background-color-green')
    cy.getByTestId('yellow').testVisual('css-background-color-yellow')
    cy.getByTestId('red').testVisual('css-background-color-red')
    cy.getByTestId('info').testVisual('css-background-color-info')
    cy.getByTestId('success').testVisual('css-background-color-success')
    cy.getByTestId('warning').testVisual('css-background-color-warning')
    cy.getByTestId('danger').testVisual('css-background-color-danger')
    cy.getByTestId('primary').testVisual('css-background-color-primary')
  })
})

describe('deprecated/css-color.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-color.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').testVisual('css-background-color-basic')
    cy.getByTestId('grey').testVisual('css-background-color-grey')
    cy.getByTestId('blue').testVisual('css-background-color-blue')
    cy.getByTestId('light-blue').testVisual('css-background-color-light-blue')
    cy.getByTestId('purple').testVisual('css-background-color-purple')
    cy.getByTestId('green').testVisual('css-background-color-green')
    cy.getByTestId('yellow').testVisual('css-background-color-yellow')
    cy.getByTestId('red').testVisual('css-background-color-red')
    cy.getByTestId('info').testVisual('css-background-color-info')
    cy.getByTestId('success').testVisual('css-background-color-success')
    cy.getByTestId('warning').testVisual('css-background-color-warning')
    cy.getByTestId('danger').testVisual('css-background-color-danger')
    cy.getByTestId('primary').testVisual('css-background-color-primary')
  })
})
