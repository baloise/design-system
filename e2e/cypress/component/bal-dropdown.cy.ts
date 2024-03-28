import { newBalOption } from '../../generated/components'
import { Components } from '../support/utils'

/**
 * TODO: autocomplete
 */

describe('bal-dropdown', () => {
  let onBalChangeSpy: Cypress.Agent<sinon.SinonSpy>

  let options = []
  let events = {
    balChange: onBalChangeSpy,
  }

  const template = `<bal-dropdown>
  <bal-option value="vGreen" label="Green">Green</bal-option>
  <bal-option value="vRed" label="Red">Red</bal-option>
  <bal-option value="vYellow" label="Yellow">Yellow</bal-option>
  <bal-option value="vPurple" label="Purple">Purple</bal-option>
</bal-dropdown>`

  beforeEach(() => {
    options = [
      newBalOption({ value: 'vGreen', label: 'Green' }),
      newBalOption({ value: 'vRed', label: 'Red' }),
      newBalOption({ value: 'vPurple', label: 'Purple' }),
      newBalOption({ value: 'vYellow', label: 'Yellow' }),
    ]
    onBalChangeSpy = cy.spy().as('balChange')
    events = {
      balChange: onBalChangeSpy,
    }
  })

  context('template options', () => {
    it('should select option and emit change event', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(template, {
        props: {
          placeholder: 'Pick a color',
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click()
      cy.getByRole('option', { name: 'Red' }).click()
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail('vRed')
      cy.get('select').should($el => expect($el.val()).deep.eq('vRed'))
    })

    it('should select multiple options and emit 2 change events', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(template, {
        props: {
          placeholder: 'Pick a color',
          multiple: true,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click()
      cy.getByRole('option', { name: 'Red' }).click()
      cy.getByRole('option', { name: 'Purple' }).click()
      cy.get('@balChange').should('have.been.calledTwice')
      cy.get('@balChange').shouldHaveEventDetail(['vRed'])
      cy.get('@balChange').shouldHaveEventDetail(['vRed', 'vPurple'], 1)
      cy.get('select').should($el => expect($el.val()).deep.eq(['vRed', 'vPurple']))
    })

    it('should not select because component is disabled', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(template, {
        props: {
          placeholder: 'Pick a color',
          disabled: true,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click({ force: true })
      cy.getByRole('option', { name: 'Red' }).click({ force: true })
      cy.get('@balChange').should('not.have.been.called')
      cy.get('select').should($el => expect($el.val()).deep.eq(null))
    })

    it('should clear values and emit a change event', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(template, {
        props: {
          placeholder: 'Pick a color',
          clearable: true,
          value: ['vYellow'],
        },
        events,
      })

      cy.getByRole('button', { name: 'Löschen' }).click()
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail(null)
      cy.get('select').should($el => expect($el.val()).deep.eq(null))
    })
  })

  context('prop options', () => {
    it('should select option and emit change event', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          options,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click()
      cy.getByRole('option', { name: 'Red' }).click()
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail('vRed')
      cy.get('select').should($el => expect($el.val()).deep.eq('vRed'))
    })

    it('should select multiple options and emit 2 change events', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          multiple: true,
          options,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click()
      cy.getByRole('option', { name: 'Red' }).click()
      cy.getByRole('option', { name: 'Purple' }).click()
      cy.get('@balChange').should('have.been.calledTwice')
      cy.get('@balChange').shouldHaveEventDetail(['vRed'])
      cy.get('@balChange').shouldHaveEventDetail(['vRed', 'vPurple'], 1)
      cy.get('select').should($el => expect($el.val()).deep.eq(['vRed', 'vPurple']))
    })

    it('should not select because component is disabled', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          disabled: true,
          options,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click({ force: true })
      cy.getByRole('option', { name: 'Red' }).click({ force: true })
      cy.get('@balChange').should('not.have.been.called')
      cy.get('select').should($el => expect($el.val()).deep.eq(null))
    })

    it('should clear values and emit a change event', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          clearable: true,
          options,
          value: ['vYellow'],
        },
        events,
      })

      cy.getByRole('button', { name: 'Löschen' }).click()
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail(null)
      cy.get('select').should($el => expect($el.val()).deep.eq(null))
    })
  })

  context('chips + multiple', () => {
    it('should remove option by clicking the chip', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          chips: true,
          multiple: true,
          value: ['vRed', 'vPurple'],
          options,
        },
        events,
      })

      cy.getByRole('button', { name: 'Schliessen' }).first().click()
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail(['vPurple'])
      cy.get('select').should($el => expect($el.val()).deep.eq(['vPurple']))
    })
  })

  context('key combos', () => {
    it('should use arrow key to select option and emit change event', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          options,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click().type('{downArrow}').type('{enter}')

      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail('vRed')
      cy.get('select').should($el => expect($el.val()).deep.eq('vRed'))
    })

    it('should use arrow key up and down to select multiple options and emit change event', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          multiple: true,
          options,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color')
        .click()
        .type('{downArrow}')
        .type('{downArrow}')
        .type('{downArrow}')
        .type('{enter}')
        .type('{upArrow}')
        .type('{enter}')

      cy.get('@balChange').should('have.been.calledTwice')
      cy.get('@balChange').shouldHaveEventDetail(['vYellow'])
      cy.get('@balChange').shouldHaveEventDetail(['vPurple', 'vYellow'], 1)
      cy.get('select').should($el => expect($el.val()).deep.eq(['vPurple', 'vYellow']))
    })

    it('should use focus by label to select option and emit change event', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          options,
        },
        events,
      })

      cy.getByPlaceholder('Pick a color').click().type('{Y}').wait(600).type('{enter}')

      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail('vYellow')
      cy.get('select').should($el => expect($el.val()).deep.eq('vYellow'))
    })
  })

  context('value + no options', () => {
    it('should show an empty dropdown since there is no option to match the value', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          value: 'vRed',
        },
        events,
      })

      cy.get('.bal-dropdown__root__content').should('be.empty')
      cy.get('select').should($el => expect($el.val()).deep.eq('vRed'))
    })

    it('should update dropdown after option update', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          value: 'vRed',
        },
        events,
      })

      cy.wait(200)
        .get('bal-dropdown')
        .then($el => {
          $el.get(0).options = options
        })

      cy.get('.bal-dropdown__root__content').contains('Red')
      cy.get('select').should($el => expect($el.val()).deep.eq('vRed'))
    })

    it('should work with dynamic chaning the options and values', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`<bal-dropdown></bal-dropdown>`, {
        props: {
          placeholder: 'Pick a color',
          options,
          value: 'vRed',
        },
        events,
      })

      cy.wait(200)
        .get('bal-dropdown')
        .then($el => {
          $el.get(0).options = [
            newBalOption({ value: 'vApple', label: 'Apple' }),
            newBalOption({ value: 'vOrange', label: 'Orange' }),
            newBalOption({ value: 'vBanana', label: 'Banana' }),
          ] as any
        })

      cy.get('.bal-dropdown__root__content').should('be.empty')
      cy.get('select').should($el => expect($el.val()).deep.eq('vRed'))

      cy.getByPlaceholder('Pick a color').click({ force: true })
      cy.getByRole('option', { name: 'Banana' }).click({ force: true })

      cy.get('.bal-dropdown__root__content').contains('Banana')
      cy.get('select').should($el => expect($el.val()).deep.eq('vBanana'))
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail('vBanana')
    })
  })

  context('a11y field label', () => {
    it('should pick a option with label linking', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(
        `<bal-field>
        <bal-field-label>Color</bal-field-label>
        <bal-field-control>
          <bal-dropdown id="component"></bal-dropdown>
        </bal-field-control>
      </bal-field>`,
        {
          props: {
            placeholder: 'Pick a color',
            options,
          },
          events,
        },
      )

      cy.getByLabelText('Color').click()
      cy.getByRole('option', { name: 'Green' }).click()
      cy.get('@balChange').should('have.been.calledOnce')
      cy.get('@balChange').shouldHaveEventDetail('vGreen')
      cy.get('select').should($el => expect($el.val()).deep.eq('vGreen'))
    })

    it('should not select option since it is disabled', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(
        `<bal-field disabled>
        <bal-field-label>Color</bal-field-label>
        <bal-field-control>
          <bal-dropdown id="component"></bal-dropdown>
        </bal-field-control>
      </bal-field>`,
        {
          props: {
            placeholder: 'Pick a color',
            options,
          },
          events,
        },
      )

      cy.getByLabelText('Color').click({ force: true })
      cy.getByRole('option', { name: 'Green' }).click({ force: true })
      cy.get('@balChange').should('not.have.been.called')
      cy.get('select').should($el => expect($el.val()).deep.eq(null))
    })
  })

  context.only('autocomplete', () => {
    it('should remove option by clicking the chip', () => {
      cy.mount<Components.BalDropdown, HTMLBalDropdownElementEventMap>(`
      <form action="https://www.w3schools.com/action_page.php" target="_blank">
        <bal-form-grid>
          <bal-form-col>
            <bal-field>
              <bal-field-label>First Name</bal-field-label>
              <bal-field-control>
                <bal-input name="firstName" autocomplete="given-name"></bal-input>
              </bal-field-control>
            </bal-field>
          </bal-form-col>
          <bal-form-col>
            <bal-field>
              <bal-field-label>Last Name</bal-field-label>
              <bal-field-control>
                <bal-input name="lastName" autocomplete="family-name"></bal-input>
              </bal-field-control>
            </bal-field>
          </bal-form-col>
          <bal-form-col>
            <bal-field>
              <bal-field-label>Country</bal-field-label>
              <bal-field-control>
                <bal-dropdown name="country" autocomplete="country">
                  <bal-option value="Switzerland" label="Switzerland">Switzerland</bal-option>
                  <bal-option value="Germany" label="Germany">Germany</bal-option>
                  <bal-option value="Italy" label="Italy">Italy</bal-option>
                </bal-dropdown>
              </bal-field-control>
            </bal-field>
          </bal-form-col>
        </bal-form-grid>
        <input type="submit" />
      </form>`, {
        props: {
          placeholder: 'Pick your country',
          options: [
            newBalOption({ label: 'Switzerland', value: 'Switzerland' }) as any,
            newBalOption({ label: 'Germany', value: 'Germany' }) as any,
            newBalOption({ label: 'Italy', value: 'Italy' }) as any,
          ],
        },
        events,
      })

      cy.getByLabelText('First Name').type('John')

      // cy.getByRole('button', { name: 'Schliessen' }).first().click()
      // cy.get('@balChange').should('have.been.calledOnce')
      // cy.get('@balChange').shouldHaveEventDetail(['vPurple'])
      // cy.get('select').should($el => expect($el.val()).deep.eq(['vPurple']))
    })
  })
})
