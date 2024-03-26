import { Components } from '../support/utils'

describe('bal-tag', () => {
  beforeEach(() => {
    const onBalCloseClickSpy = cy.spy().as('balCloseClick')

    cy.mount<Components.BalTag, HTMLBalTagElementEventMap>(`<bal-tag>My tag</bal-tag>`, {
      props: {
        closable: true,
      },
      events: {
        balCloseClick: onBalCloseClickSpy,
      },
    })
  })

  it('should have a default slot', () => {
    cy.get('bal-tag').contains('My tag')
  })

  it('should fire close event', () => {
    cy.get('bal-tag').find('bal-close').click()
    cy.get('@balCloseClick').should('have.been.calledOnce')
  })
})
