import { BalPagination } from '../../.storybook/vue/generated/components'

describe('bal-pagination.cy.ts', () => {
  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalPagination, {
      props: {
        value: 1,
        pageRange: 3,
        totalPages: 20,
        onBalChange: onBalChangeSpy,
      },
    })

    cy.get('.bal-pagination').find('.bal-pagination__nav__pagination-list > li').eq(2).find('.bal-button').click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail(3)
  })
})
