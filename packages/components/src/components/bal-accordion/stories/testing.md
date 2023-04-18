## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](?path=/docs/development-testing--page)

<!-- START: human documentation -->

```typescript
import { byTestId, selectors } from '@baloise/design-system-testing'

describe('Accordion', () => {

  it('should ...', () => {
    cy.getByTestId('my-accordion').find(selectors.accordion.trigger).contains('Show more')
    cy.getByTestId('my-accordion').balAccordionIsClosed()
    cy.getByTestId('my-accordion').find(selectors.accordion.trigger).click()
    cy.getByTestId('my-accordion').balAccordionIsOpen()
    cy.getByTestId('my-accordion').find(selectors.accordion.details).contains('My Content')
  })
})
```

<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                | Description                         | Signature                                          |
| ---------------------- | ----------------------------------- | -------------------------------------------------- |
| `balAccordionIsOpen`   | Asserts if the accordion is open.   | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balAccordionIsClosed` | Asserts if the accordion is closed. | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Component Element Selectors

| Selector            | Element             |
| ------------------- | ------------------- |
| `accordion.trigger` | The trigger button. |
| `accordion.content` | Content wrapper.    |

