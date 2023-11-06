## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```ts
import { byTestId } from '@baloise/design-system-testing'

describe('Modal', () => {
  const modal = byTestId('my-modal') // [data-testid="my-modal"]
  const openModalButton = byTestId('my-open-modal')
  const closeModalButton = byTestId('my-close-modal')
  it('should ...', () => {
    cy.get(openModalButton).click()
    cy.get(modal).balModalIsOpen()
    cy.get(modal).find('bal-modal-header').contains('Modal Title')
  })
})
```

<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command            | Description                                                                                         | Signature                                        |
| ------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `balModalFindOpen` | Finds the open modal and returns it.                                                                | (options?: Partial<Loggable>): Chainable<JQuery> |
| `balModalIsOpen`   | Assert if the modal is open.                                                                        | (options?: Partial<Loggable>): Chainable<JQuery> |
| `balModalIsClosed` | Assert if the modal is closed. Only works for modals, which are not created with the modal service. | (options?: Partial<Loggable>): Chainable<JQuery> |
| `balModalClose`    | Closes the selected modal.                                                                          | (options?: Partial<Loggable>): Chainable<JQuery> |


### Selectors

| Selector     | Element        |
| ------------ | -------------- |
| `modal.main` | Modal element. |

