import { selectors, Components } from '../support/utils'

describe('bal-popup', () => {
  beforeEach(() => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalPopup, HTMLBalPopupElementEventMap>(
      `
    <div>
      <bal-button id="trigger" bal-popup="component">Button</bal-button>
      <bal-popup id="component" label="My Title" closable>TEST CONTENT</bal-popup>
    </div>
    `,
      {
        events: {
          balChange: onBalChangeSpy,
        },
      },
    )
  })

  it('should open and close the popup', () => {
    cy.get('#component').should('not.be.visible')
    cy.get('#trigger').click()
    cy.get('bal-popup').waitForComponents()

    cy.get('#component').should('be.visible')
    cy.get(selectors.popup.label).contains('My Title')
    cy.get(selectors.popup.content).contains('TEST CONTENT')
    cy.get('@balChange').should('have.been.calledOnce')

    cy.get(selectors.popup.close).click()
    cy.get('bal-popup').waitForComponents()
    cy.get('#component').should('not.be.visible')
    cy.get('@balChange').should('have.been.calledTwice')
  })
})
