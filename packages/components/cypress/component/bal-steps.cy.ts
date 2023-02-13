import { BalSteps } from '../../.storybook/vue/generated/components'
import { newBalStepOption } from '../../src/components/bal-steps/bal-step.util'
import BalStepsTest from './bal-steps.vue'

describe('bal-steps.cy.ts', () => {
  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalSteps, {
      props: {
        onBalChange: onBalChangeSpy,
        value: '3',
        options: [
          newBalStepOption({ label: 'Done', value: '1', done: true }),
          newBalStepOption({ label: 'Failed', value: '2', failed: true }),
          newBalStepOption({ label: 'Active', value: '3' }),
          newBalStepOption({ label: 'Default', value: '4' }),
          newBalStepOption({ label: 'Disabled', value: '5', disabled: true }),
          newBalStepOption({ label: 'Hidden', value: '6', hidden: true }),
        ],
      },
    })

    cy.get('.bal-steps').find('.bal-steps__nav__carousel__item').eq(0).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('1')
  })

  it('hidden item should not be visible', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalStepsTest, {
      props: {
        interface: 'tabs',
        value: 'tab-b',
        border: true,
        fullwidth: true,
        onBalChange: onBalChangeSpy,
      },
    })

    cy.get('.bal-steps').find('bal-step-item').should('have.length', 5)
    cy.get('.bal-steps').find('.bal-steps__nav__item').should('have.length', 4)

    cy.get('.bal-steps').find('.bal-step-item').eq(0).spyEvent('balNavigate')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balNavigate').should('not.have.been.called')
  })
})
