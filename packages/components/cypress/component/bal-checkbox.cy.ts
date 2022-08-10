import { BalCheckbox } from '../../.storybook/vue/components'

describe('bal-checkbox.cy.ts', () => {
  it('should have a default slot', () => {
    cy.mount(BalCheckbox, { slots: { default: () => 'My label' } })
    cy.get('bal-checkbox').contains('My label')
    cy.get('bal-checkbox').find('input').should('not.be.checked')
  })

  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalCheckbox, {
      props: {
        onBalChange: onBalChangeSpy,
      },
      slots: {
        default: () => 'My label',
      },
    })

    cy.get('bal-checkbox').click()
    cy.get('bal-checkbox').find('input').should('be.checked')
    cy.get('@balChange').should('have.been.calledOnce')
  })

  it('should not fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalCheckbox, {
      props: {
        disabled: true,
        onBalChange: onBalChangeSpy,
      },
      slots: {
        default: () => 'My label',
      },
    })

    cy.get('bal-checkbox').click({ force: true })
    cy.get('bal-checkbox').find('input').should('not.be.checked')
    cy.get('@balChange').should('not.have.been.called')
  })
})
