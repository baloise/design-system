import { selectors } from '../support/utils'
import BalPopupTest from './bal-popup.vue'

describe('bal-popup', () => {
  context('basic trigger', () => {
    beforeEach(() => {
      const onBalChangeSpy = cy.spy().as('balChange')

      cy.mount(BalPopupTest, {
        props: {
          onBalChange: onBalChangeSpy,
        },
      })

      cy.waitForDesignSystem()
    })

    it('should ...', () => {
      cy.get('#popup-test').should('not.be.visible')
      cy.get('#trigger').click()
      cy.get('bal-popup').waitForComponents()

      cy.get('#popup-test').should('be.visible')
      cy.get(selectors.popup.label).contains('My Title')
      cy.get(selectors.popup.content).contains('TEST CONTENT')
      cy.get('@balChange').should('have.been.calledOnce')

      cy.get(selectors.popup.close).click()
      cy.get('bal-popup').waitForComponents()
      cy.get('#popup-test').should('not.be.visible')
      cy.get('@balChange').should('have.been.calledTwice')
    })
  })
})
