import BalTabsTest from './bal-tabs.vue'

describe('bal-popover.cy.ts', () => {
  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalTabsTest, {
      props: {
        interface: 'tabs',
        value: 'tab-b',
        border: true,
        fullwidth: true,
        onBalChange: onBalChangeSpy,
      },
    })

    cy.get('.bal-tabs').find('.bal-tabs__tabs > ul > li').eq(0).click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('tab-a')
  })
})
