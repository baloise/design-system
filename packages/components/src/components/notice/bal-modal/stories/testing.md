## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Modal', () => {
  const modal = dataTestSelector('my-modal') // [data-test-id="my-modal"]
  const openModalButton = dataTestSelector('my-open-modal')
  const closeModalButton = dataTestSelector('my-close-modal')
  it('should ...', () => {
    cy.get(openModalButton).click()
    cy.get(modal).balModalIsOpen()
    cy.get(modal).find('bal-modal-header').contains('Modal Title')
  })
})
```

<!-- END: human documentation -->

### Custom Commands

A list of the custom commands for this specific component.

| Command            | Description                    | Signature               |
| ------------------ | ------------------------------ | ----------------------- |
| `balModalIsOpen`   | Assert if the modal is open.   | `(): Chainable<JQuery>` |
| `balModalIsClosed` | Assert if the modal is closed. | `(): Chainable<JQuery>` |
