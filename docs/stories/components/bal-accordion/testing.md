## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                | Description                         | Signature                                        |
| ---------------------- | ----------------------------------- | ------------------------------------------------ |
| `balAccordionIsOpen`   | Asserts if the accordion is open.   | (options?: Partial<Loggable>): Chainable<JQuery> |
| `balAccordionIsClosed` | Asserts if the accordion is closed. | (options?: Partial<Loggable>): Chainable<JQuery> |


### Selectors

| Selector            | Element                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `accordion.trigger` | The trigger button, which shows and hides the content / details. |
| `accordion.details` | The content or the hidden part of the accordion.                 |
| `accordion.summary` | The header or visible part of the accordion                      |

