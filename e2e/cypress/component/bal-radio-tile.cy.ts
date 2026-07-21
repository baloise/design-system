import { Components } from '../support/utils'

describe('bal-radio-tile', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount<Components.BalRadioGroup, HTMLBalRadioGroupElementEventMap>(
      `
    <bal-radio-group interface="tile">
      <bal-radio value="1">
        <bal-stack>
          <bal-label>Radio 1</bal-label>
          <bal-radio-icon></bal-radio-icon>
        </bal-stack>
      </bal-radio>
      <bal-radio value="2">
        <bal-stack>
          <bal-label>Radio 2</bal-label>
          <bal-radio-icon></bal-radio-icon>
        </bal-stack>
      </bal-radio>
      <bal-radio value="3">
        <bal-stack>
          <bal-label>Radio 3</bal-label>
          <bal-radio-icon></bal-radio-icon>
        </bal-stack>
      </bal-radio>
    </bal-radio-group>`,
      {
        props: {
          value: '3',
        },
        events: {
          click: onClickSpy,
          balFocus: onBalFocusSpy,
          balChange: onBalChangeSpy,
          balBlur: onBalBlurSpy,
        },
      },
    )
  })

  it('should select first one and send change event', () => {
    cy.get('bal-radio').eq(0).click().find('input').blur()

    cy.get('bal-radio').eq(0).find('input').should('be.checked')
    cy.get('bal-radio').eq(1).find('input').should('not.be.checked')
    cy.get('bal-radio').eq(2).find('input').should('not.be.checked')

    cy.get('@click').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balBlur').should('have.been.calledOnce')
  })

  it('should change prop value of the group and not sent change event', () => {
    cy.get('bal-radio').eq(2).find('input').should('be.checked')
    cy.get('bal-radio').eq(0).find('input').should('not.be.checked')
    cy.get('bal-radio').eq(1).find('input').should('not.be.checked')

    cy.get('@click').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.called')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balBlur').should('not.have.been.called')
  })

  it('should not be able to select the disabled option', () => {
    cy.get('bal-radio').eq(2).invoke('attr', 'disabled', true)

    cy.get('bal-radio').eq(2).click({ force: true }).find('input').blur({ force: true })

    cy.get('@click').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.called')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balBlur').should('not.have.been.called')
  })
})
