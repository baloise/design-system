import BalSelectTest from './bal-select.vue'

describe('bal-select.cy.ts', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')

    cy.mount(BalSelectTest, {
      props: {
        onClick: onClickSpy,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
      },
    })
  })

  it('should fire a balChange event when selecting an option', () => {
    cy.get('bal-select').find('.data-test-select-input').click()
    cy.get('.bal-select__option').eq(2).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1997')
  })

  it('should fire a balChange event when selecting multiple options', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true)

    cy.get('bal-select').find('.data-test-select-input').click()
    cy.get('.bal-select__option').eq(1).click()
    cy.get('.bal-select__option').eq(2).click()

    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
    cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1997'], 1)
  })

  it('should fire only input event typing', () => {
    cy.get('bal-select').invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.data-test-select-input').click()
    cy.get('bal-select').find('.data-test-select-input').type('{1}').type('{9}').type('{9}').type('{8}').type('{enter}')

    cy.get('@balInput').should('have.been.callCount', 4)
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1998')
  })
})
