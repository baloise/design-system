import { Components } from '../support/utils'

describe('bal-option-list', () => {
  let onBalOptionChangeSpy: Cypress.Agent<sinon.SinonSpy>

  let events = {
    onBalOptionChangeSpy: onBalOptionChangeSpy,
  }

  const template = `<bal-option-list>
      <bal-option value="vGreen" label="Green">Green</bal-option>
      <bal-option value="vRed" label="Red">Red</bal-option>
      <bal-option value="vYellow" label="Yellow">Yellow</bal-option>
      <bal-option value="vPurple" label="Purple">Purple</bal-option>
    </bal-option-list>`

  beforeEach(() => {
    onBalOptionChangeSpy = cy.spy().as('balOptionChange')
    events = {
      onBalOptionChangeSpy: onBalOptionChangeSpy,
    }

    cy.mount<Components.BalOptionList>(template,
      {
        events: {
          balOptionChange: onBalOptionChangeSpy,
        },
      },
    )
  })


  it('should select an option and emit an event', () => {
    cy.getByRole('option', { name: 'Red' }).click()
    cy.get('@balOptionChange').should('have.been.calledOnce')
    cy.get('@balOptionChange').shouldHaveEventDetail({ label: 'Red', value: 'vRed', selected: true })
  })

  it('should select two option and emit two event', () => {
    cy.getByRole('option', { name: 'Red' }).click()
    cy.getByRole('option', { name: 'Yellow' }).click()
    cy.get('@balOptionChange').should('have.been.calledTwice')
    cy.get('@balOptionChange').shouldHaveEventDetail({ label: 'Red', value: 'vRed', selected: true })
    cy.get('@balOptionChange').shouldHaveEventDetail({ label: 'Yellow', value: 'vYellow', selected: true }, 1)
  })
})
