describe('bal-accordion - v1', () => {
  beforeEach(() => cy.visit('/components/bal-accordion/test/bal-accordion.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('accordion-desktop')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').testVisual('accordion-desktop-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').testVisual('accordion-desktop-closed')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('accordion-tablet')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').testVisual('accordion-tablet-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').testVisual('accordion-tablet-closed')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('accordion-mobile')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').testVisual('accordion-mobile-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').testVisual('accordion-mobile-closed')
  })

  it('with card', () => {
    cy.platform('desktop')
    cy.getByTestId('with-card').testVisual('accordion-with-card')
    cy.getByTestId('with-card').click()
    cy.getByTestId('with-card').testVisual('accordion-with-card-open')
    cy.getByTestId('with-card').click()
    cy.getByTestId('with-card').testVisual('accordion-with-card-closed')
  })
})
