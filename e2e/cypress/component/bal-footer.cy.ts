import { Components } from '../../generated'

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

  it('should contain custom links', () => {
    cy.mount<Components.BalFooter, HTMLBalFooterElement>(`<bal-footer></bal-footer>`, {
      props: {
        overrideLinks: [{label: 'Test Link', link: 'https://www.baloise.ch'}],
      }
    })
    cy.get('bal-footer').contains('Test Link')
    cy.get('bal-footer').should('not.contain', 'Datenschutz')
  })

})
