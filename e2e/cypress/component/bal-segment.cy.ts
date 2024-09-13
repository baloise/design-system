import { Components } from '../support/utils'

describe('bal-segment', () => {
  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalPagination, HTMLBalPaginationElementEventMap>(
      `<bal-segment>
        <bal-segment-item value="yes" label="Yes"></bal-segment-item>
        <bal-segment-item value="no" label="No"></bal-segment-item>
      </bal-segment>`,
      {
        props: {},
        events: {
          balChange: onBalChangeSpy,
        },
      },
    )

    cy.getByRole('button', { name: 'Yes' }).click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('yes')
  })
})
