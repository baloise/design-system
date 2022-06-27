## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-nest-testing'

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

### Custom Commands

A list of the custom commands for this specific component.

| Command                      | Description                                               | Signature                                                                                                                         |
| ---------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `balDropdownToggle`          | Opens and closes the dropdown.                            | `(): Chainable<JQuery>`                                                                                                           |
| `balDropdownIsOpen`          | Asserts if the dropdown is open.                          | `(): Chainable<JQuery>`                                                                                                           |
| `balDropdownIsClosed`        | Asserts if the dropdown is closed.                        | `(): Chainable<JQuery>`                                                                                                           |
| `balDropdownTriggerContains` | Asserts if the trigger button contains the given content. | `( content: string \| number \| RegExp, options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>, ): Chainable<JQuery>` |
| `balDropdownMenuContains`    | Asserts if the dropdown menu contains the given content.  | `( content: string \| number \| RegExp, options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>, ): Chainable<JQuery>` |
