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

    cy.get('.bal-tabs').find('.bal-tabs-item').eq(0).spyEvent('balNavigate')

    cy.get('.bal-tabs').find('.bal-tabs__tabs > ul > li').eq(0).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('tab-a')
    cy.get('@balNavigate').should('have.been.calledOnce')
  })

  it('hidden item should not be visible', () => {
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

    cy.get('.bal-tabs').find('.bal-tabs__tabs > ul > li').eq(3).should('not.be.visible')
  })

  it('disabled item should not send a change event', () => {
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

    cy.get('.bal-tabs').find('.bal-tabs-item').eq(4).spyEvent('balNavigate')

    cy.get('.bal-tabs').find('.bal-tabs__tabs > ul > li').eq(4).click()
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balNavigate').should('not.have.been.called')
  })
})
