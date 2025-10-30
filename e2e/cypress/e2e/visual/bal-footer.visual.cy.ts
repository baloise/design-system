describe('bal-footer', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://www.baloise.ch/app-integration/v2/ch/footer/de.json', {
      fixture: 'bal-footer.footer.json',
    }).as('getFooterLinks')
    cy.intercept('GET', 'https://www.baloise.ch/app-integration/v1/ch/socialmediachannels/de.json', {
      fixture: 'bal-footer.socialmediachannels.json',
    }).as('getSocialMediaChannels')
    cy.visit('/components/bal-footer/test/bal-footer.visual.html').platform('desktop').waitForDesignSystem()
  })

  it('basic component', () => {
    cy.platform('desktop').wait(100)
    cy.getByTestId('basic').testVisual('basic-footer-desktop')
    cy.getByTestId('all-variations').testVisual('all-variations-footer-desktop')
    cy.getByTestId('partner-variant').testVisual('partner-variant-footer-desktop')

    cy.platform('tablet').wait(100)
    cy.getByTestId('basic').testVisual('basic-footer-tablet')
    cy.getByTestId('all-variations').testVisual('all-variations-footer-tablet')
    cy.getByTestId('partner-variant').testVisual('partner-variant-footer-tablet')

    cy.platform('mobile').wait(100)
    cy.getByTestId('basic').testVisual('basic-footer-mobile')
    cy.getByTestId('all-variations').testVisual('all-variations-footer-mobile')
    cy.getByTestId('partner-variant').testVisual('partner-variant-footer-mobile')
  })
})
