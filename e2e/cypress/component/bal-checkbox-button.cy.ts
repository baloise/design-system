import { Components } from '../support/utils'

describe('bal-checkbox-button', () => {
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
    <bal-checkbox-group>
      <bal-checkbox-button>
        <bal-stack>
          <bal-checkbox name="checkbox-test" value="1" label="Checkbox 1"></bal-checkbox>
        </bal-stack>
      </bal-checkbox-button>
      <bal-checkbox-button>
        <bal-stack>
          <bal-checkbox name="checkbox-test" value="2" label="Checkbox 2"></bal-checkbox>
        </bal-stack>
      </bal-checkbox-button>
      <bal-checkbox-button>
        <bal-stack>
          <bal-checkbox name="checkbox-test" value="3" label="Checkbox 3"></bal-checkbox>
        </bal-stack>
      </bal-checkbox-button>
    </bal-checkbox-group>`,
      {
        props: {
          value: ['3'],
          control: true,
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
    cy.get('bal-checkbox-button').eq(0).find('input').check({ force: true }).blur()

    cy.get('bal-checkbox-button').eq(0).find('input').should('be.checked')
    cy.get('bal-checkbox-button').eq(1).find('input').should('not.be.checked')
    cy.get('bal-checkbox-button').eq(2).find('input').should('be.checked')

    cy.get('@click').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balBlur').should('have.been.calledOnce')
  })

  it('should change prop value of the group and not sent change event', () => {
    cy.get('bal-checkbox-button').eq(2).find('input').should('be.checked')
    cy.get('bal-checkbox-button').eq(0).find('input').should('not.be.checked')
    cy.get('bal-checkbox-button').eq(1).find('input').should('not.be.checked')

    cy.get('@click').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.called')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balBlur').should('not.have.been.called')
  })

  it('should not be able to select the disabled option', () => {
    cy.get('bal-checkbox-button').eq(2).invoke('attr', 'disabled', true)

    cy.get('bal-checkbox-button').eq(2).click({ force: true }).find('input').blur({ force: true })

    cy.get('@click').should('not.have.been.called')
    cy.get('@balFocus').should('not.have.been.called')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balBlur').should('not.have.been.called')
  })
})
