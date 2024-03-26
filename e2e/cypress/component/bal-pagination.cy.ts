import { Components } from '../support/utils'

describe('bal-pagination', () => {
  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalPagination, HTMLBalPaginationElementEventMap>(`<bal-pagination></bal-pagination>`, {
      props: {
        value: 1,
        pageRange: 3,
        totalPages: 20,
      },
      events: {
        balChange: onBalChangeSpy,
      },
    })

    cy.get('.bal-pagination').find('.bal-pagination__nav__pagination-list > li').eq(2).find('.bal-button').click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail(3)
  })
})
