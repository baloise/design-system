## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command        | Description                 | Signature                                          |
| -------------- | --------------------------- | -------------------------------------------------- |
| `balToastFind` | Returns the visible toasts. | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Component Element Selectors

| Selector      | Element              |
| ------------- | -------------------- |
| `toast.main`  | Toast element.       |
| `toast.label` | Toast label element. |
| `toast.close` | Toast close element. |

