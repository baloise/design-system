## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
describe('Datepicker', () => {
  it('should type and assert the date in the datepicker', () => {
    cy.getByPlaceholder('Enter date') // or cy.getByLabelText('Birthday')
      .click()
      .type('20.2.23')
      .blur()
      .should('have.value', '20.02.2023')
  })
})
```

<!-- END: human documentation -->

