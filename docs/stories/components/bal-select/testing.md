## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
describe('Select', () => {
  const select = byTestId('my-select') // [data-testid="my-select"]

  it('should ...', () => {
    cy.get(select)
      .click() // opens the select
      .select('1995')
      .should('have.value', '1995')
    cy.get(select).balSelectFindOptions().should('have.length', 6)
    cy.get(select).balSelectShouldHaveOptions(['1995', '1996', '1997', '1998', '1999', '2000'])
  })
})

describe('typeahead', () => {
  const typeahead = byTestId('my-typeahead') // [data-testid="my-typeahead"]

  it('should clear select and search for the Black Widow', () => {
    cy.get(typeahead).clear().type('Black{enter}').should('have.value', 'Black Widow')
  })
})

describe('multiple', () => {
  const multiple = byTestId('my-multiple') // [data-testid="my-multiple"]

  it('should ', () => {
    cy.get(multiple)
      .click()
      .select(['Black Widow', 'Black Panter'])
      .should('have.value', ['Black Widow', 'Black Panter'])
    cy.get(multiple).balSelectFindOptions().first().click()
    cy.get(page.multiple).balSelectFindChips().first().contains('Iron Man').click() // clicks the chip to remove the selection
  })
})
```

<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                      | Description                                                | Signature                                                                                  |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `balSelectFindOptions`       | Returns the select options.                                | (options?: Partial\<Loggable>): Chainable                                                  |
| `balSelectFindChips`         | Returns the closable select chips (only with multiselect). | (options?: Partial\<Loggable>): Chainable                                                  |
| `balSelectShouldHaveOptions` | Asserts that the select has the given options.             | (labels: string[], dataType?: 'label' \| 'value', options?: Partial\<Loggable>): Chainable |


### Selectors

| Selector         | Element               |
| ---------------- | --------------------- |
| `select.input`   | Native input element. |
| `select.options` | Select option.        |
| `select.chips`   | Multi select tag .    |

