import { Components } from '../support/utils'

describe('bal-checkbox-group', () => {
  let onClickSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalFocusSpy: Cypress.Agent<sinon.SinonSpy>
  let onBalBlurSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    onClickSpy = cy.spy().as('click')
    onBalFocusSpy = cy.spy().as('balFocus')
    onBalChangeSpy = cy.spy().as('balChange')
    onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount<Components.BalCheckboxGroup, HTMLBalCheckboxGroupElementEventMap>(
      `
      <bal-checkbox-group control :value="value">
        <bal-checkbox name="checkbox-test" value="1" label="Checkbox 1"></bal-checkbox>
        <bal-checkbox name="checkbox-test" value="2" label="Checkbox 2"></bal-checkbox>
        <bal-checkbox name="checkbox-test" value="3" label="Checkbox 3"></bal-checkbox>
      </bal-checkbox-group>
      `,
      {
        props: {
          value: ['3'],
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
    cy.get('bal-checkbox').eq(0).find('input').check({ force: true }).blur()

    cy.get('bal-checkbox').eq(0).find('input').should('be.checked')
    cy.get('bal-checkbox').eq(1).find('input').should('not.be.checked')
    cy.get('bal-checkbox').eq(2).find('input').should('be.checked')

    cy.get('@click').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balBlur').should('have.have.been.calledOnce')
  })

  it('should change prop value of the group and not sent change event', () => {
    cy.get('bal-checkbox').eq(2).find('input').should('be.checked')
    cy.get('bal-checkbox').eq(0).find('input').should('not.be.checked')
    cy.get('bal-checkbox').eq(1).find('input').should('not.be.checked')

    cy.get('@balChange').should('not.have.been.called')
  })

  it('should not be able to select the disabled option', () => {
    const cb = cy.get('bal-checkbox').eq(2)

    cb.invoke('attr', 'disabled', true)
    cb.click({ force: true }).find('input').blur({ force: true })

    cy.get('@click').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.called')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balBlur').should('not.have.been.called')
  })

  it.only('should disable whole group', () => {
    const cb = cy.get('bal-checkbox-group')

    cb.invoke('attr', 'disabled', true)
    cb.should('be.disabled')
  })
})
