## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command            | Description                       | Signature                                          |
| ------------------ | --------------------------------- | -------------------------------------------------- |
| `balPopupIsOpen`   | Asserts if the popover is open.   | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balPopupIsClosed` | Asserts if the popover is closed. | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Selectors

| Selector        | Element                         |
| --------------- | ------------------------------- |
| `popup.trigger` | Popup trigger.                  |
| `popup.content` | Popup content element.          |
| `popup.close`   | Popup close button in the head. |
| `popup.label`   | Popup label / heading element.  |

