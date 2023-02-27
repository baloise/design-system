import { BalButton } from '../../.storybook/vue/generated/components'

describe('bal-button.cy.ts', () => {
  beforeEach(() => {
    const onClickSpy = cy.spy().as('click')

    cy.mount(BalButton, {
      props: {
        onClick: onClickSpy,
      },
      slots: {
        default: () => 'My Button',
      },
    })

    cy.get('bal-button').waitForComponents()
  })

  it('should have a default slot', () => {
    cy.mount(BalButton, { slots: { default: () => 'My Button' } })
    cy.get('bal-button').contains('My Button')
  })

  it('should fire close event', () => {
    cy.get('bal-button').find('button').click()
    cy.get('@click').should('have.been.calledOnce')
  })

  it('should fire close event', () => {
    cy.mount(BalButton, {
      props: {
        disabled: true,
      },
    })

    cy.get('bal-button').find('button').should('have.attr', 'disabled')
  })
})
