import { BalTag } from '../../.storybook/vue/components'

describe('bal-tag.cy.ts', () => {
  it('should have a default slot', () => {
    cy.mount(BalTag, { slots: { default: () => 'My tag' } })
    cy.get('bal-tag').contains('My tag')
  })

  it('should fire close event', () => {
    const onBalCloseClickSpy = cy.spy().as('balCloseClick')

    cy.mount(BalTag, {
      props: {
        closable: true,
        onBalCloseClick: onBalCloseClickSpy,
      },
      slots: {
        default: () => 'My tag',
      },
    })

    cy.get('bal-tag').find('bal-close').click()
    cy.get('@balCloseClick').should('have.been.calledOnce')
  })
})
