import { Components } from '../support/utils'
import { selectors } from '../support/utils'

describe('bal-accordion', () => {
  context('v1', () => {
    beforeEach(() => {
      const onClickSpy = cy.spy().as('click')
      const onBalChangeSpy = cy.spy().as('balChange')

      cy.mount<Components.BalAccordion, HTMLBalAccordionElementEventMap>(`<bal-accordion></bal-accordion>`, {
        props: {
          openLabel: 'OPEN LABEL',
          closeLabel: 'CLOSE LABEL',
        },
        events: {
          click: onClickSpy,
          balChange: onBalChangeSpy,
        },
      })
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

        cy.mount<Components.BalAccordion, HTMLBalAccordionElementEventMap>(
          `
        <bal-accordion>
          <bal-accordion-summary>
            <bal-stack>
              <bal-content>
                <bal-label>SUMMARY LABEL</bal-label>
              </bal-content>
              <bal-accordion-trigger></bal-accordion-trigger>
            </bal-stack>
          </bal-accordion-summary>
          <bal-accordion-details>TEST CONTENT</bal-accordion-details>
        </bal-accordion>
        `,
          {
            props: {},
            events: {
              click: onClickSpy,
              balChange: onBalChangeSpy,
            },
          },
        )
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

        cy.mount<Components.BalAccordion, HTMLBalAccordionElementEventMap>(
          `
        <bal-accordion>
          <bal-accordion-summary trigger>
            <bal-stack>
              <bal-content>
                <bal-label>SUMMARY LABEL</bal-label>
              </bal-content>
              <bal-accordion-trigger></bal-accordion-trigger>
            </bal-stack>
          </bal-accordion-summary>
          <bal-accordion-details>TEST CONTENT</bal-accordion-details>
        </bal-accordion>`,
          {
            props: {},
            events: {
              click: onClickSpy,
              balChange: onBalChangeSpy,
            },
          },
        )
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
