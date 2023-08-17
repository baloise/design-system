import { BalInputDate } from '../support/utils'

describe('bal-input-date.cy.ts', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalInputSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalKeyPressSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalInputSpy = cy.spy().as('balInput')
    onBalBlurSpy = cy.spy().as('balBlur')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalKeyPressSpy = cy.spy().as('balKeyPress')

    cy.mount(BalInputDate, {
      props: {
        onClick: onClickSpy,
        onBalInput: onBalInputSpy,
        onBalChange: onBalChangeSpy,
        onBalBlur: onBalBlurSpy,
        onBalFocus: onBalFocusSpy,
        onBalKeyPress: onBalKeyPressSpy,
      },
    })
    cy.get('bal-input-date').waitForComponents()
  })

  it('should render the component with the initial state', () => {
    cy.get('bal-input-date').should('exist')
    cy.get('bal-input-date').shadow().find('input').should('exist')
    cy.get('bal-input-date').shadow().find('input').should('not.have.class', 'is-disabled')
    cy.get('bal-input-date').shadow().find('input').should('not.have.class', 'is-danger')
    cy.get('bal-input-date').shadow().find('input').should('not.have.class', 'is-clickable')
    cy.get('bal-input-date').shadow().find('input').should('not.have.class', 'has-icon-right')
    cy.get('bal-input-date').shadow().find('input').should('not.be.disabled')
    cy.get('bal-input-date').shadow().find('input').should('not.have.attr', 'aria-disabled')
    cy.get('bal-input-date').shadow().find('input').should('not.have.attr', 'required')
    cy.get('bal-input-date').shadow().find('input').should('not.have.attr', 'placeholder')
    cy.get('bal-input-date').shadow().find('input').should('have.value', '')
  })

  it('should update the value when typing', () => {
    cy.get('bal-input-date').shadow().find('input').type('20021988', { delay: 10 })
    cy.get('bal-input-date').shadow().find('input').should('have.value', '20.02.1988')
  })

  it('should only call balInput and no balChange, because the input has still the focus', () => {
    cy.get('bal-input-date').shadow().find('input').should('have.value', '')
    cy.get('bal-input-date').shadow().find('input').focus().type('1.1.23').blur({ force: true })
    cy.get('bal-input-date').shadow().find('input').should('have.value', '01.01.2023')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 10)
    cy.get('@balBlur').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balKeyPress').should('have.been.callCount', 6)
  })

  it('should fire no balChange and no balInput, because the field has still a focus', () => {
    cy.get('bal-input-date').shadow().find('input').should('have.value', '')
    cy.get('bal-input-date').shadow().find('input').type('1.1.')

    cy.get('bal-input-date').shadow().find('input').should('have.value', '01.01.____')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('have.been.callCount', 7)
  })

  it('should fire balChange and no balInput, because only the value of the web component is changed', () => {
    cy.get('bal-input-date').invoke('attr', 'value', '88')

    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('have.been.callCount', 2)
  })

  it('should fire a click event', () => {
    cy.get('bal-input-date').shadow().find('input').click()

    cy.get('@click').should('have.been.calledOnce')
  })

  it('should not fire a click event, because the input is disabled', () => {
    cy.get('bal-input-date').invoke('attr', 'disabled', true)
    cy.get('bal-input-date').shadow().find('input').should('have.class', 'is-disabled')
    cy.get('bal-input-date').shadow().find('input').should('have.attr', 'aria-disabled')
    cy.get('bal-input-date').shadow().find('input').should('have.attr', 'disabled')
    cy.get('bal-input-date').shadow().find('input').click({ force: true })

    cy.get('@click').should('not.have.been.called')
  })
})
