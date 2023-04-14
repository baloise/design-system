## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](?path=/docs/development-testing--page)

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command            | Description                              | Signature                                          |
| ------------------ | ---------------------------------------- | -------------------------------------------------- |
| `balFieldFindHint` | Returns the hint component of the label. | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Component Element Selectors

| Selector     | Element       |
| ------------ | ------------- |
| `field.hint` | Hint element. |

