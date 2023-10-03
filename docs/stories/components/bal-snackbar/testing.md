## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command           | Description                    | Signature                                          |
| ----------------- | ------------------------------ | -------------------------------------------------- |
| `balSnackbarFind` | Returns the visible snackbars. | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Selectors

| Selector           | Element                   |
| ------------------ | ------------------------- |
| `snackbar.main`    | Snackbar element.         |
| `snackbar.heading` | Snackbar heading element. |
| `snackbar.label`   | Snackbar label element.   |
| `snackbar.close`   | Snackbar close element.   |
| `snackbar.action`  | Snackbar action element.  |

