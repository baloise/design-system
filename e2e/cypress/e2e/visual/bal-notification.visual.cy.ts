describe('bal-notification', () => {
  beforeEach(() => cy.visit('/components/bal-notification/test/bal-notification.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('notification-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('notification-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('notification-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('notification-variants-desktop')

    cy.platform('tablet')
    cy.testVisual('notification-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('notification-variants-mobile')
  })
})
