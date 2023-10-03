## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                         | Description                                                          | Signature                                                      |
| ------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| `balDatepickerToggle`           | Opens and closes the datepicker popover.                             | `(options?: Partial<Loggable>): Chainable<JQuery>`             |
| `balDatepickerIsOpen`           | Assert if the datepicker popover is open.                            | `(options?: Partial<Loggable>): Chainable<JQuery>`             |
| `balDatepickerIsClosed`         | Assert if the datepicker popover is closed.                          | `(options?: Partial<Loggable>): Chainable<JQuery>`             |
| `balDatepickerPick`             | Picks the date in the datepicker like a human.                       | `(date: Date, options?: Partial<Loggable>): Chainable<JQuery>` |
| `balDatepickerIsDateInRange`    | Asserts if the given date is in range in the datepicker popover.     | `(date: Date, options?: Partial<Loggable>): Chainable<JQuery>` |
| `balDatepickerIsDateNotInRange` | Asserts if the given date is not in range in the datepicker popover. | `(date: Date, options?: Partial<Loggable>): Chainable<JQuery>` |


### Component Element Selectors

| Selector           | Element               |
| ------------------ | --------------------- |
| `datepicker.input` | Native input element. |

