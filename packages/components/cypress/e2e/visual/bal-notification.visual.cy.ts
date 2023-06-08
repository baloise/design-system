describe('bal-notification', () => {
  beforeEach(() =>
    cy.visit('/components/notice/bal-notification/test/bal-notification.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('notification-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('notification-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('notification-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('notification-variants-desktop')

    cy.platform('tablet')
    cy.compareSnapshot('notification-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('notification-variants-mobile')
  })
})
