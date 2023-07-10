## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
describe('Popup', () => {
  it('should open and close the popup', () => {
    cy.getByTestId('popup').balPopupIsClosed()
    cy.getByTestId('popup-trigger').click()
    cy.getByTestId('popup').balPopupIsOpen()
    cy.getByTestId('popup-trigger').click()
    cy.getByTestId('popup').balPopupIsClosed()
  })

  it('should contain trigger and menu content', () => {
    cy.getByTestId('popup-trigger').click()
    cy.getByTestId('popup').contains('TEST CONTENT')
  })
})
```

<!-- END: human documentation -->

