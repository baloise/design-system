import { Components, newBalStepOption } from '../support/utils'

describe('bal-steps', () => {
  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalSteps, HTMLBalStepsElementEventMap>(`<bal-steps></bal-steps>`, {
      props: {
        value: '3',
        options: [
          newBalStepOption({ label: 'Done', value: '1', done: true }),
          newBalStepOption({ label: 'Failed', value: '2', failed: true }),
          newBalStepOption({ label: 'Active', value: '3' }),
          newBalStepOption({ label: 'Default', value: '4' }),
          newBalStepOption({ label: 'Disabled', value: '5', disabled: true }),
          newBalStepOption({ label: 'Hidden', value: '6', invisible: true }),
        ],
      },
      events: {
        balChange: onBalChangeSpy,
      },
    })

    cy.get('.bal-steps').find('.bal-steps__nav__carousel__item').eq(0).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('1')
  })

  it('hidden item should not be visible', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalSteps, HTMLBalStepsElementEventMap>(
      `
    <bal-steps>
      <bal-step-item value="tab-a" label="Tab A" done>Content of Tab A</bal-step-item>
      <bal-step-item value="tab-b" label="Tab B" failed>Content of Tab B</bal-step-item>
      <bal-step-item value="tab-c" label="Tab C" active>Content of Tab C</bal-step-item>
      <bal-step-item value="tab-d" label="Tab D" invisible>Hidden Content of Tab D</bal-step-item>
      <bal-step-item value="tab-e" label="Tab E" disabled>Content of Tab E</bal-step-item>
    </bal-steps>
    `,
      {
        props: {
          value: 'tab-b',
        },
        events: {
          balChange: onBalChangeSpy,
        },
      },
    )

    cy.get('.bal-steps').find('bal-step-item').should('have.length', 5)
    cy.get('.bal-steps').find('.bal-steps__nav__item').should('have.length', 4)

    cy.get('.bal-steps').find('.bal-step-item').eq(0).spyEvent('balNavigate')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balNavigate').should('not.have.been.called')
  })
})
