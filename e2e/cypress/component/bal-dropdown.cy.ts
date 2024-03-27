import { newBalOption } from '../../generated/components'
import { Components } from '../support/utils'

describe('bal-dropdown', () => {
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>

  // let options = []
  let events = {
    balChange: onBalChangeSpy,
  }

  beforeEach(() => {
    // options = [
    //   newBalOption({ value: 'vGreen', label: 'Green' }),
    //   newBalOption({ value: 'vRed', label: 'red' }),
    //   newBalOption({ value: 'vPurple', label: 'purple' }),
    //   newBalOption({ value: 'vYellow', label: 'yellow' }),
    // ]
    onBalChangeSpy = cy.spy().as('balChange')
    events = {
      balChange: onBalChangeSpy,
    }
  })

  it('should', () => {
    cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown>
      <bal-option value="vGreen" label="Green">Green</bal-option>
      <bal-option value="vRed" label="Red">Red</bal-option>
      <bal-option value="vYellow" label="Yellow">Yellow</bal-option>
      <bal-option value="vPurple" label="Purple">Purple</bal-option>
    </bal-dropdown>`, {
      props: {},
      events,
    })


  })


})
