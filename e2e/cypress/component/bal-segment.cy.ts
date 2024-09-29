import { Components } from '../support/utils'

describe('bal-segment', () => {
  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalSegment, HTMLBalSegmentElementEventMap>(
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

    cy.get('bal-segment-item').contains('Yes').closest('bal-segment-item').click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('yes')
  })

  it('should not fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalSegment, HTMLBalSegmentElementEventMap>(
      `<bal-segment>
        <bal-segment-item value="yes" label="Yes"></bal-segment-item>
        <bal-segment-item value="no" label="No"></bal-segment-item>
      </bal-segment>`,
      {
        props: {
          value: 'yes',
        },
        events: {
          balChange: onBalChangeSpy,
        },
      },
    )

    cy.get('bal-segment-item').contains('Yes').closest('bal-segment-item').click()
    cy.get('@balChange').should('not.have.been.called')
  })
})
