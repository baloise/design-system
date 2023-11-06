## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                         | Description                                                          | Signature                                             |
| ------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| `balDatepickerToggle`           | Opens and closes the datepicker popover.                             | (options?: Partial\<Loggable>): Chainable             |
| `balDatepickerIsOpen`           | Assert if the datepicker popover is open.                            | (options?: Partial\<Loggable>): Chainable             |
| `balDatepickerIsClosed`         | Assert if the datepicker popover is closed.                          | (options?: Partial\<Loggable>): Chainable             |
| `balDatepickerPick`             | Picks the date in the datepicker like a human.                       | (date: Date, options?: Partial\<Loggable>): Chainable |
| `balDatepickerIsDateInRange`    | Asserts if the given date is in range in the datepicker popover.     | (date: Date, options?: Partial\<Loggable>): Chainable |
| `balDatepickerIsDateNotInRange` | Asserts if the given date is not in range in the datepicker popover. | (date: Date, options?: Partial\<Loggable>): Chainable |


### Selectors

| Selector           | Element               |
| ------------------ | --------------------- |
| `datepicker.input` | Native input element. |

