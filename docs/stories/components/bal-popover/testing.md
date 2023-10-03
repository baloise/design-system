## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                     | Description                                               | Signature                                                                                                                      |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `balPopoverToggle`          | Opens and closes the popover.                             | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                                             |
| `balPopoverIsOpen`          | Asserts if the popover is open.                           | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                                             |
| `balPopoverIsClosed`        | Asserts if the popover is closed.                         | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                                             |
| `balPopoverTriggerContains` | Asserts if the trigger button contains the given content. | `(content: string \| number \| RegExp, options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>): Chainable<JQuery>` |
| `balPopoverContentContains` | Asserts if the popover menu contains the given content.   | `(content: string \| number \| RegExp, options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>): Chainable<JQuery>` |


### Component Element Selectors

| Selector          | Element                  |
| ----------------- | ------------------------ |
| `popover.trigger` | Popover trigger.         |
| `popover.content` | Popover content element. |

