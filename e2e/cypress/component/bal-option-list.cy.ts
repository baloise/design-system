import { Components } from '../support/utils'

describe('bal-option-list', () => {
  it('should select an option and emit an event', () => {
    const onBalOptionChangeSpy = cy.spy().as('balOptionChange')
    cy.mount<Components.BalOptionList>(
      `<bal-option-list>
      <bal-option value="vGreen" label="Green">Green</bal-option>
      <bal-option value="vRed" label="Red">Red</bal-option>
      <bal-option value="vYellow" label="Yellow">Yellow</bal-option>
      <bal-option value="vPurple" label="Purple">Purple</bal-option>
    </bal-option-list>`,
      {
        events: {
          balOptionChange: onBalOptionChangeSpy,
        },
      },
    )

    cy.getByRole('option', { name: 'Red' }).click()
    cy.get('@balOptionChange').should('have.been.calledOnce')
    cy.get('@balOptionChange').shouldHaveEventDetail({ label: 'Red', value: 'vRed', selected: true })
  })
})
