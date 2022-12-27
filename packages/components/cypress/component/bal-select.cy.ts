import BalSelectTest from './bal-select.vue'

describe('bal-select.cy.ts', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')
    onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount(BalSelectTest, {
      props: {
        onClick: onClickSpy,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
        onBalBlur: onBalBlurSpy,
      },
    })
  })
  // Basic
  // it('should fire a balChange event when selecting an option', () => {
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('.bal-select__option').eq(2).click()

  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1997')
  // })

  // it('should fire a balChange event after value change', () => {
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('.bal-select__option').eq(2).click()
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('.bal-select__option').eq(3).click()

  //   cy.get('@balChange').should('have.been.callCount', 2)
  //   cy.get('@balChange').shouldHaveEventDetail('v1998', 1)
  // })

  // it('should fire a balBlur when leaving the control', () => {
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('body').click(0, 0)

  //   cy.get('@balBlur').should('have.been.calledOnce')
  // })

  // it('should select option with the key entry plus enter', () => {
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('bal-select').type('Cypress.io{downArrow}').type('Cypress.io{enter}')

  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1995')
  // })

  // Typeahead
  // it('should fire only input event typing', () => {
  //   cy.get('bal-select').invoke('attr', 'typeahead', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('bal-select').find('.data-test-select-input').type('{1}').type('{9}').type('{9}').type('{8}').blur()

  //   cy.get('@balInput').should('have.been.callCount', 4)
  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1998')
  // })

  // it('typeahead should fire a balBlur when leaving the control', () => {
  //   cy.get('bal-select').invoke('attr', 'typeahead', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('body').click(0, 0)

  //   cy.get('@balBlur').should('have.been.calledOnce')
  // })

  it('should find and select option with the key navigation search and arrow keys plus enter', () => {
    // fix this
    cy.get('bal-select').invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.data-test-select-input').click()
    cy.get('bal-select').find('.data-test-select-input').type('{1}').type('{9}').type('{9}')
    // cy.get('bal-select').type('{downArrow}').type('{enter}')

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1995')
  })

  // Multiple
  // it('should fire a balChange event when selecting multiple options', () => {
  //   cy.get('bal-select').invoke('attr', 'multiple', true)

  //   cy.get('bal-select').find('.bal-select__control__selections').click()
  //   cy.get('.bal-select__option').eq(1).click()
  //   cy.get('.bal-select__option').eq(2).click()

  //   cy.get('@balChange').should('have.been.callCount', 2)
  //   cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
  //   cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1997'], 1)
  // })

  // it('multiple should fire a balBlur when leaving the control', () => {
  //   cy.get('bal-select').invoke('attr', 'multiple', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('body').click(0, 0)

  //   cy.get('@balBlur').should('have.been.calledOnce')
  // })

  // Typeahead + Multiple
  // it('should fire a balChange event after value change', () => {
  //   cy.get('bal-select').invoke('attr', 'multiple', true).invoke('attr', 'typeahead', true)

  //   cy.get('bal-select').find('.bal-select__control__selections').click()
  //   cy.get('.bal-select__option').eq(1).click()
  //   cy.get('.bal-select__option').eq(2).click()

  //   cy.get('@balChange').should('have.been.callCount', 2)
  //   cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
  //   cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1997'], 1)
  // })

  // it('should fire a balBlur when leaving the control', () => {
  //   cy.get('bal-select').invoke('attr', 'multiple', true).invoke('attr', 'typeahead', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('body').click(0, 0)

  //   cy.get('@balBlur').should('have.been.calledOnce')
  // })

  // Typeahead + Remote
  // it('should fire only input event typing', () => {
  //   cy.get('bal-select').invoke('attr', 'typeahead', true).invoke('attr', 'remote', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('bal-select').find('.data-test-select-input').type('{1}').type('{9}').type('{9}').type('{8}').blur()

  //   cy.get('@balInput').should('have.been.callCount', 4)
  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1998')
  // })

  // it('should fire a balBlur when leaving the control', () => {
  //   cy.get('bal-select').invoke('attr', 'typeahead', true).invoke('attr', 'remote', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('body').click(0, 0)

  //   cy.get('@balBlur').should('have.been.calledOnce')
  // })
})
