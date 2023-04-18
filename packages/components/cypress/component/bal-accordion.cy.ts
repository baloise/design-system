import { selectors } from '../support/generated'
import { BalAccordion } from '../../.storybook/vue/generated/components'
import BalAccordionTest from './bal-accordion.vue'

describe('bal-accordion', () => {
  context('v1', () => {
    beforeEach(() => {
      const onClickSpy = cy.spy().as('click')
      const onBalChangeSpy = cy.spy().as('balChange')

      cy.mount(BalAccordion, {
        props: {
          openLabel: 'OPEN LABEL',
          closeLabel: 'CLOSE LABEL',
          onClick: onClickSpy,
          onBalChange: onBalChangeSpy,
        },
        slots: { default: () => 'TEST CONTENT' },
      })

      cy.waitForDesignSystem()
    })

    it('should have labels', () => {
      cy.get('bal-accordion').contains('OPEN LABEL')
      cy.get(selectors.accordion.trigger).click()
      cy.get('bal-accordion').contains('CLOSE LABEL')
    })

    it('should call balChange when open ', () => {
      cy.get(selectors.accordion.trigger).click()
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail(true)

      cy.get('bal-accordion').waitForComponents()

      cy.get(selectors.accordion.trigger).click()
      cy.get('@balChange').should('have.been.calledTwice')
      cy.get('@balChange').shouldHaveEventDetail(false, 1)
    })
  })

  context('v2', () => {
    context('basic trigger', () => {
      beforeEach(() => {
        const onClickSpy = cy.spy().as('click')
        const onBalChangeSpy = cy.spy().as('balChange')

        cy.mount(BalAccordionTest, {
          props: {
            onClick: onClickSpy,
            onBalChange: onBalChangeSpy,
          },
        })

        cy.waitForDesignSystem()
      })

      it('should have labels', () => {
        cy.get(selectors.accordion.summary).contains('SUMMARY LABEL')
        cy.get(selectors.accordion.trigger).click()
        cy.get(selectors.accordion.details).contains('TEST CONTENT')
      })

      it('should call balChange when open ', () => {
        cy.get(selectors.accordion.trigger).click()
        cy.get('@balChange').should('have.been.calledOnce')
        cy.get('@balChange').shouldHaveEventDetail(true)

        cy.get('bal-accordion').waitForComponents()

        cy.get(selectors.accordion.trigger).click()
        cy.get('@balChange').should('have.been.calledTwice')
        cy.get('@balChange').shouldHaveEventDetail(false, 1)
      })
    })

    context('summary trigger', () => {
      beforeEach(() => {
        const onClickSpy = cy.spy().as('click')
        const onBalChangeSpy = cy.spy().as('balChange')

        cy.mount(BalAccordionTest, {
          props: {
            summaryTrigger: true,
            onClick: onClickSpy,
            onBalChange: onBalChangeSpy,
          },
        })

        cy.waitForDesignSystem()
      })

      it('should have labels', () => {
        cy.get(selectors.accordion.summary).contains('SUMMARY LABEL')
        cy.get(selectors.accordion.summary).click()
        cy.get(selectors.accordion.details).contains('TEST CONTENT')
      })

      it('should call balChange when open ', () => {
        cy.get(selectors.accordion.summary).click()
        cy.get('@balChange').should('have.been.calledOnce')
        cy.get('@balChange').shouldHaveEventDetail(true)

        cy.get('bal-accordion').waitForComponents()

        cy.get(selectors.accordion.summary).click()
        cy.get('@balChange').should('have.been.calledTwice')
        cy.get('@balChange').shouldHaveEventDetail(false, 1)

        cy.get(selectors.accordion.trigger).click()
        cy.get('@balChange').should('have.callCount', 3)
        cy.get('@balChange').shouldHaveEventDetail(true, 2)

        cy.get('bal-accordion').waitForComponents()

        cy.get(selectors.accordion.trigger).click()
        cy.get('@balChange').should('have.callCount', 4)
        cy.get('@balChange').shouldHaveEventDetail(false, 3)
      })
    })
  })
})
