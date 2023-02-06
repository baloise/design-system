import BalSelectTest from './bal-select.vue'

describe('bal-select.cy.ts', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('balClick')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')
    onBalBlurSpy = cy.spy().as('balBlur')
    onBalFocusSpy = cy.spy().as('balFocus')

    cy.mount(BalSelectTest, {
      props: {
        onClick: onClickSpy,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
        onBalBlur: onBalBlurSpy,
        onBalFocus: onBalFocusSpy,
      },
    })
  })
  // Basic
  // it('should fire a balChange event when selecting an option', () => {
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('.bal-select__option').eq(2).click()

  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@click').should('have.been.calledOnce')
  //   cy.get('@balFocus').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1997')
  //   // cy.get('@balBlur').should('have.been.calledOnce') // fired twice // issue
  // })

  // it('should fire a balChange event after value change', () => {
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('.bal-select__option').eq(2).click()
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('.bal-select__option').eq(3).click()

  //   cy.get('@balChange').should('have.been.callCount', 2)
  //   cy.get('@balChange').shouldHaveEventDetail('v1998', 1)
  // })

  // it('should select option with the key entry plus enter', () => {
  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('bal-select').type('Cypress.io{downArrow}').type('Cypress.io{enter}')

  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1995')
  // })

  // it('should not fire a click event, because the select is disabled', () => {
  //   cy.get('bal-select').invoke('attr', 'disabled', true)
  //   cy.get('bal-select').should('have.attr', 'disabled')
  //   cy.get('bal-select').find('.data-test-select-input').click({ force: true })

  //   cy.get('@click').should('not.have.been.calledOnce')
  // })

  // Typeahead
  // it('should fire only input event typing', () => {
  //   cy.get('bal-select').invoke('attr', 'typeahead', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('bal-select').find('.data-test-select-input').type('{1}').type('{9}').type('{9}').type('{8}').blur()

  //   cy.get('@balInput').should('have.been.callCount', 4)
  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1998')
  //   cy.get('@balFocus').should('have.been.calledOnce')
  //   // cy.get('@balClick').should('have.been.calledOnce') // not working
  // })

  // it('typeahead should fire a balBlur when select the option', () => {
  //   cy.get('bal-select').invoke('attr', 'typeahead', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('bal-select').find('.data-test-select-input').type('{1}').type('{9}').type('{9}').type('{8}')
  //   cy.get('.bal-select__option').eq(0).click()

  //   cy.get('@balBlur').should('have.been.calledTwice') // fired twice // issue
  // })

  // it('should find and select option with the key navigation search and arrow keys plus enter', () => {
  //   cy.get('bal-select').invoke('attr', 'typeahead', true)

  //   cy.get('bal-select').find('.data-test-select-input').click()
  //   cy.get('bal-select').find('.data-test-select-input').type('{1}').type('{9}').type('{9}')
  //   cy.get('bal-select').type('{downArrow}').type('{enter}')

  //   cy.get('@balChange').should('have.been.calledOnce')
  //   cy.get('@balChange').shouldHaveEventDetail('v1995')
  //   cy.get('@balBlur').should('have.been.calledTwice') // fired twice // issue
  // })

  // Multiple
  // it('should fire a balChange event when selecting multiple options', () => {
  //   cy.get('bal-select').invoke('attr', 'multiple', true)

  //   cy.get('bal-select').find('.bal-select__control__selections').click()
  //   cy.get('.bal-select__option').eq(1).click()
  //   cy.get('.bal-select__option').eq(2).click()

  //   cy.get('@balChange').should('have.been.callCount', 2)
  //   cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
  //   cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1997'], 1)
  //   cy.get('@balFocus').should('have.been.calledOnce')
  //   // cy.get('@balClick').should('have.been.calledOnce') // not working
  // })

  // it('multiple should fire a balBlur when leaving the control', () => {
  //   cy.get('bal-select').invoke('attr', 'multiple', true)

  //   cy.get('bal-select').find('.bal-select__control__selections').click()
  //   cy.get('body').click(50, 400, { force: true })

  //   cy.get('@balBlur').should('have.been.calledOnce')
  // })

  // it('should fire one blur event when click on the input field', () => {
  //   cy.get('bal-select').invoke('attr', 'multiple', true)

  //   cy.get('bal-select').find('.bal-select__control__selections').click()
  //   cy.get('.bal-select__option').eq(1).click()
  //   cy.get('bal-select').find('.bal-select__control__selections').click()

  //   cy.get('@balBlur').should('have.been.calledTwice') // why is called twice?? should be called once
  // })

  // Typeahead + Multiple
  it('should fire a balChange event after value change', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true).invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('.bal-select__option').eq(1).click()
    cy.get('.bal-select__option').eq(2).click()

    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
    cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1997'], 1)
  })

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
