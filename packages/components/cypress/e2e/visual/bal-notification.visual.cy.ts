describe('bal-notification', () => {
  before(() => cy.page('/components/notice/bal-notification/test/bal-notification.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('notification-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('notification-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('notification-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('notification-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('notification-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('notification-variants-mobile', 0.0)
  })
})
