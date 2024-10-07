describe('bal-steps', () => {
  beforeEach(() => cy.visit('/components/bal-steps/test/bal-steps.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('steps').testVisual('tabs-steps')
    cy.getByTestId('steps-with-four').testVisual('tabs-steps-with-four')

    cy.platform('tablet')
    cy.getByTestId('steps').testVisual('tabs-steps-tablet')
    cy.getByTestId('steps-with-four').testVisual('tabs-steps-with-four-tablet')

    cy.platform('mobile')
    cy.getByTestId('steps').testVisual('tabs-steps-mobile')
    cy.getByTestId('steps-with-four').testVisual('tabs-steps-with-four-mobile')
  })

  it('color variants', () => {
    cy.platform('desktop')
    cy.getByTestId('light-blue').testVisual('tabs-steps-color-light-blue')
    cy.getByTestId('purple').testVisual('tabs-steps-color-purple')
    cy.getByTestId('red').testVisual('tabs-steps-color-red')
    cy.getByTestId('green').testVisual('tabs-steps-color-green')
    cy.getByTestId('yellow').testVisual('tabs-steps-color-yellow')
  })
})
