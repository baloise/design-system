## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/ds-testing'

describe('Popover', () => {
  const popover = byTestId('my-popover') // [data-testid="my-popover"]
  it('should ...', () => {
    cy.get(popover)
      .balPopoverIsClosed()
      .balPopoverToggle()
      .balPopoverIsOpen()
      .balPopoverTriggerContains('Trigger button label')
      .balPopoverContentContains('Body content')
  })
})
```

<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                     | Description                                               | Signature                                                                                                             |
| --------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `balPopoverToggle`          | Opens and closes the popover.                             | (options?: Partial\<Loggable>): Chainable                                                                             |
| `balPopoverIsOpen`          | Asserts if the popover is open.                           | (options?: Partial\<Loggable>): Chainable                                                                             |
| `balPopoverIsClosed`        | Asserts if the popover is closed.                         | (options?: Partial\<Loggable>): Chainable                                                                             |
| `balPopoverTriggerContains` | Asserts if the trigger button contains the given content. | (content: string \| number \| RegExp, options?: Partial\<Loggable & Timeoutable & CaseMatchable & Shadow>): Chainable |
| `balPopoverContentContains` | Asserts if the popover menu contains the given content.   | (content: string \| number \| RegExp, options?: Partial\<Loggable & Timeoutable & CaseMatchable & Shadow>): Chainable |


### Selectors

| Selector          | Element                  |
| ----------------- | ------------------------ |
| `popover.trigger` | Popover trigger.         |
| `popover.content` | Popover content element. |

