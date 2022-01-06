## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Popover', () => {
  const popover = dataTestSelector('my-popover') // [data-test-id="my-popover"]
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
