## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](?path=/docs/development-testing--page)

<!-- START: human documentation -->

```typescript
import { byTestId, selectors } from '@baloise/design-system-testing'

describe('Accordion', () => {
  const accordion = byTestId('my-accordion') // [data-testid="my-accordion"]

  it('should ...', () => {
    cy.get(accordion).find(selectors.accordion.header).contains('Show more')
    cy.get(accordion).balAccordionIsClosed()
    cy.get(accordion).click().balAccordionIsOpen()
    cy.get(accordion).find(selectors.accordion.header).contains('Show less')
    cy.get(accordion).find(selectors.accordion.content).contains('My Content')
    cy.get(accordion).click().balAccordionIsClosed()
  })
})
```

### Custom Selectors

A list of the custom commands for this specific component.

| Selector            | Element             |
| ------------------- | ------------------- |
| `accordion.header`  | The trigger button. |
| `accordion.content` | Content wrapper.    |

<!-- END: human documentation -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                | Description                         | Signature                                          |
| ---------------------- | ----------------------------------- | -------------------------------------------------- |
| `balAccordionIsOpen`   | Asserts if the accordion is open.   | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balAccordionIsClosed` | Asserts if the accordion is closed. | `(options?: Partial<Loggable>): Chainable<JQuery>` |
