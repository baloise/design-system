## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```ts
describe('Dropdown', () => {
  it('should ...', () => {
    cy.getByPlaceholder('Pick a color').click()
    cy.getByRole('option', { name: 'Red' }).click()

    cy.getByPlaceholder('Pick a color').should('be.disabled')
    cy.getByPlaceholder('Pick a color').should('have.value', 'vRed')
  })
})
```

<!-- END: human documentation -->

### Selectors

| Selector           | Element                              |
| ------------------ | ------------------------------------ |
| `dropdown.input`   | Native input element.                |
| `dropdown.options` | Select option.                       |
| `dropdown.trigger` | Trigger to open and close the popup. |
| `dropdown.chips`   | Multi select tag .                   |

