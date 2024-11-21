import { Components } from '../support/utils'

Cypress.on('uncaught:exception', (_err, _runnable) => {
  return false
})

describe('bal-select', () => {
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

    cy.mount<Components.BalSelect, HTMLBalSelectElementEventMap>(
      `
    <bal-select>
      <bal-select-option value="v1995" label="1995">1995</bal-select-option>
      <bal-select-option value="v1996" label="1996">1996</bal-select-option>
      <bal-select-option value="v1997" label="1997">1997</bal-select-option>
      <bal-select-option value="v1998" label="1998">1998</bal-select-option>
      <bal-select-option value="v1999" label="1999">1999</bal-select-option>
      <bal-select-option value="v2000" label="2000">2000</bal-select-option>
    </bal-select>
    `,
      {
        events: {
          click: onClickSpy,
          balInput: onBalInputSpy,
          balChange: onBalChangeSpy,
          balBlur: onBalBlurSpy,
          balFocus: onBalFocusSpy,
        },
      },
    )
  })
  // Basic
  it('should fire a balChange, balFocus and balBlur events when selecting an option', () => {
    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('.bal-select__option').eq(2).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1997')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balBlur').should('have.been.calledOnce')
  })

  it('should fire a balChange event after value change', () => {
    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('.bal-select__option').eq(2).click()
    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('.bal-select__option').eq(3).click()

    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balChange').shouldHaveEventDetail('v1998', 1)
  })

  it.only('should select option with the key entry plus enter', () => {
    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('bal-select').type('{downArrow}').type('{enter}')

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1996')
  })

  it('should not fire a click event, because the select is disabled', () => {
    cy.get('bal-select').invoke('attr', 'disabled', true)
    cy.get('bal-select').should('be.disabled')
    cy.get('bal-select').find('.bal-select__control__input').click({ force: true })

    cy.get('@balClick').should('not.have.been.calledOnce')
  })

  // Typeahead
  it('should fire input event when typing and should fire balFocus and balChange events (typeahead)', () => {
    cy.get('bal-select').invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('bal-select').find('.bal-select__control__input').type('{1}').type('{9}').type('{9}').type('{8}').blur()

    cy.get('@balInput').should('have.been.callCount', 4)
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1998')
    cy.get('@balFocus').should('have.been.calledOnce')
  })

  it('should fire a balBlur when select the option (typeahead)', () => {
    cy.get('bal-select').invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('bal-select').find('.bal-select__control__input').type('{1}').type('{9}').type('{9}').type('{8}')
    cy.get('.bal-select__option').eq(0).click()

    cy.get('@balBlur').should('have.been.calledOnce')
  })

  it('should find and select option with the key navigation search and arrow keys plus enter (typeahead)', () => {
    cy.get('bal-select').invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('bal-select').find('.bal-select__control__input').type('{1}').type('{9}').type('{9}')
    cy.get('bal-select').type('{downArrow}').type('{enter}').blur({ force: true })

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1996')
    cy.get('@balBlur').should('have.been.calledOnce')
  })

  // Multiple
  it('should fire a balChange and balFocus events when selecting multiple options (multiple)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('.bal-select__option').eq(1).click()
    cy.get('.bal-select__option').eq(2).click()

    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
    cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1997'], 1)
    cy.get('@balFocus').should('have.been.calledOnce')
  })

  it.skip('should find and select option with the key navigation search and arrow keys plus enter (multiple)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('bal-select').type('{downArrow}').type('{enter}')
    cy.get('bal-select').type('{downArrow}').type('{enter}')

    cy.get('@balChange').should('have.been.callCount', 4)
    cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
    cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1998'], 1)
  })

  it('multiple should fire a balBlur when leaving the control (multiple)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.getByTestId('bal-select-input')
  })

  it('should fire one blur event when click on the input field (multiple)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('.bal-select__option').eq(1).click()
    cy.get('bal-select').find('.bal-select__control__selections').click()
  })

  // Typeahead + Multiple
  it('should fire a balChange and balFocus event after value change (typeahead + multiple)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true).invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('.bal-select__option').eq(1).click()
    cy.get('.bal-select__option').eq(2).click()

    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balChange').shouldHaveEventDetail(['v1996'], 0)
    cy.get('@balChange').shouldHaveEventDetail(['v1996', 'v1997'], 1)
    cy.get('@balFocus').should('have.been.callCount', 3)
  })

  it.skip('should find and select option with the key navigation search and arrow keys plus enter (typeahead + multiple)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true).invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('bal-select').type('{downArrow}').type('{enter}')
    cy.get('bal-select').type('{downArrow}').type('{enter}')

    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balChange').shouldHaveEventDetail(['v1995'], 0)
    cy.get('@balChange').shouldHaveEventDetail(['v1995', 'v1996'], 1)
  })

  it('should fire balInput and balChange event after value change (typeahead + multiple)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true).invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('bal-select').find('.bal-select__control__input').type('{1}').type('{9}').type('{9}')
    cy.get('.bal-select__option').eq(0).click()
    cy.get('.bal-select__option').eq(1).click()

    cy.get('@balInput').should('have.been.callCount', 3)
    cy.get('@balChange').should('have.been.callCount', 2)
    cy.get('@balChange').shouldHaveEventDetail(['v1995'], 0)
    cy.get('@balChange').shouldHaveEventDetail(['v1995', 'v1996'], 1)
  })

  // Typeahead + Remote
  it('should fire input event when typing and should fire balFocus and balChange events (typeahead + remote)', () => {
    cy.get('bal-select').invoke('attr', 'typeahead', true).invoke('attr', 'remote', true)

    cy.get('bal-select').find('.bal-select__control__input').click()
    cy.get('bal-select').find('.bal-select__control__input').type('{1}').type('{9}').type('{9}').type('{8}').blur()

    cy.get('@balInput').should('have.been.callCount', 4)
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('v1998')
    cy.get('@balFocus').should('have.been.calledOnce')
  })

  it.skip('should find and select option with the key navigation search and arrow keys plus enter (typeahead + remote)', () => {
    cy.get('bal-select').invoke('attr', 'multiple', true).invoke('attr', 'typeahead', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('bal-select').find('.bal-select__control__input').type('{1}').type('{9}').type('{9}')
    cy.get('bal-select').type('{downArrow}').type('{enter}')

    cy.get('@balChange').should('have.been.callCount', 1)
    cy.get('@balChange').shouldHaveEventDetail(['v1995'])
  })

  it('should fire a balBlur when leaving the control (typeahead + remote)', () => {
    cy.get('bal-select').invoke('attr', 'typeahead', true).invoke('attr', 'remote', true)

    cy.get('bal-select').find('.bal-select__control__selections').click()
    cy.get('.bal-select__option').eq(1).click()
    cy.get('bal-select').find('.bal-select__control__selections').click()
  })
})
