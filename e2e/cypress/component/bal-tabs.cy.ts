import { BalTabs, newBalTabOption } from '../support/utils'
import BalTabsTest from './bal-tabs.vue'

describe('bal-tabs.cy.ts', () => {
  it('should fire change event with options', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalTabs, {
      props: {
        value: 'tab-b',
        border: true,
        fullwidth: true,
        onBalChange: onBalChangeSpy,
        options: [
          newBalTabOption({ label: 'Tab A', value: 'tab-a' }),
          newBalTabOption({ label: 'Tab B', value: 'tab-b' }),
          newBalTabOption({ label: 'Tab C', value: 'tab-c' }),
        ],
      },
    })
    cy.get('.bal-tabs').waitForDesignSystem()
    cy.get('.bal-tabs').find('.bal-tabs__nav__carousel__item').eq(0).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('tab-a')
  })

  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalTabsTest, {
      props: {
        value: 'tab-b',
        border: true,
        fullwidth: true,
        onBalChange: onBalChangeSpy,
      },
    })
    cy.get('.bal-tabs').waitForDesignSystem()
    cy.get('.bal-tabs').find('.bal-tabs__nav__carousel__item').eq(0).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('tab-a')
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
    cy.get('.bal-tabs').waitForDesignSystem()
    cy.get('.bal-tabs').find('.bal-tabs__nav__carousel__item').should('have.length', 5)
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
    cy.get('.bal-tabs').waitForDesignSystem()
    cy.get('.bal-tabs').find('.bal-tab-item').eq(4).spyEvent('balNavigate')

    cy.get('.bal-tabs').find('.bal-tabs__nav__carousel__item').eq(3).click()
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balNavigate').should('not.have.been.called')
  })
})
