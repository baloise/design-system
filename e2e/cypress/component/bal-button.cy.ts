import { Components } from '../../generated'

describe('bal-button', () => {
  it('should have a default slot', () => {
    cy.mount<Components.BalButton, HTMLBalButtonElementEventMap>(`<bal-button>My Button</bal-button>`)
    cy.get('bal-button').contains('My Button')
  })

  it('should fire close event', () => {
    const onClickSpy = cy.spy().as('click')
    cy.mount<Components.BalButton, HTMLBalButtonElementEventMap>(`<bal-button>My Button</bal-button>`, {
      props: {},
      events: {
        click: onClickSpy,
      },
    })
    cy.get('bal-button').find('button').click()
    cy.get('@click').should('have.been.calledOnce')
  })

  it('should fire close event', () => {
    cy.mount<Components.BalButton, HTMLBalButtonElementEventMap>(`<bal-button>My Button</bal-button>`, {
      props: {
        disabled: true,
      },
    })

    cy.get('bal-button').find('button').should('be.disabled')
  })
})
