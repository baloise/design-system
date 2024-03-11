describe('css-border.visual', () => {
  beforeEach(() => cy.visit('/test/css-border.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('border-none').testVisual('css-border-none')
    cy.getByTestId('border-primary').testVisual('css-border-primary')
    cy.getByTestId('border-grey').testVisual('css-border-grey')
    cy.getByTestId('border-grey-dark').testVisual('css-border-grey-dark')
    cy.getByTestId('border-warning').testVisual('css-border-warning')
    cy.getByTestId('border-success').testVisual('css-border-success')
    cy.getByTestId('border-danger').testVisual('css-border-danger')
    cy.getByTestId('border-primary-light').testVisual('css-border-primary-light')
    cy.getByTestId('border-white').testVisual('css-border-white')
  })
})

describe('deprecated-css-border.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-border.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('border-none').testVisual('css-border-none')
    cy.getByTestId('border-primary').testVisual('css-border-primary')
    cy.getByTestId('border-grey').testVisual('css-border-grey')
    cy.getByTestId('border-grey-dark').testVisual('css-border-grey-dark')
    cy.getByTestId('border-warning').testVisual('css-border-warning')
    cy.getByTestId('border-success').testVisual('css-border-success')
    cy.getByTestId('border-danger').testVisual('css-border-danger')
    cy.getByTestId('border-primary-light').testVisual('css-border-primary-light')
    cy.getByTestId('border-white').testVisual('css-border-white')
  })
})
