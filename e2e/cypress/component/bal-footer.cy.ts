import { Components } from '../../generated'

describe('bal-footer', () => {
  it('should contain custom links', () => {
    cy.mount<Components.BalFooter, HTMLBalFooterElement>(`<bal-footer></bal-footer>`, {
      props: {
        overrideLinks: [{ label: 'Test Link', link: 'https://www.baloise.ch' }],
      },
    })
    cy.get('bal-footer').contains('Test Link')
    cy.get('bal-footer').should('not.contain', 'Datenschutz')
  })
})
