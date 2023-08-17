import { BalTag } from '../support/utils'

describe('bal-tag.cy.ts', () => {
  beforeEach(() => {
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

    cy.get('bal-tag').waitForComponents()
  })

  it('should have a default slot', () => {
    cy.get('bal-tag').contains('My tag')
  })

  it('should fire close event', () => {
    cy.get('bal-tag').find('bal-close').click()
    cy.get('@balCloseClick').should('have.been.calledOnce')
  })
})
