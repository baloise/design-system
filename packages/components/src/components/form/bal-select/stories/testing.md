## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
describe('Select', () => {
  const select = dataTestSelector('my-select') // [data-test-id="my-select"]

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
  const typeahead = dataTestSelector('my-typeahead') // [data-test-id="my-typeahead"]

  it('should clear select and search for the Black Widow', () => {
    cy.get(typeahead).clear().type('Black{enter}').should('have.value', 'Black Widow')
  })
})

describe('multiple', () => {
  const multiple = dataTestSelector('my-multiple') // [data-test-id="my-multiple"]

  it('should ', () => {
    cy.get(multiple).click().select(['Black Widow', 'Black Panter']).should('have.value', ['Black Widow', 'Black Panter'])
    cy.get(multiple).balSelectFindOptions().first().click()
    cy.get(page.multiple).balSelectFindChips().first().contains('Iron Man').click() // clicks the chip to remove the selection
  })
})
```

<!-- END: human documentation -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                      | Description                                                | Signature                                                              |
| ---------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| `balSelectFindOptions`       | Returns the select options.                                | `(): Chainable<JQuery>`                                                |
| `balSelectFindChips`         | Returns the closable select chips (only with multiselect). | `(): Chainable<JQuery>`                                                |
| `balSelectShouldHaveOptions` | Asserts that the select has the given options.             | `(labels: string[], dataType?: 'label' \| 'value'): Chainable<JQuery>` |
