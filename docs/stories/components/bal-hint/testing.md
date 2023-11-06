## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                  | Description                                                                    | Signature                                 |
| ------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------- |
| `balHintFindOverlay`     | Returns the hint content overlay with the title, content and the close button. | (options?: Partial\<Loggable>): Chainable |
| `balHintFindCloseButton` | Returns the close button of the overlay content.                               | (options?: Partial\<Loggable>): Chainable |


### Selectors

| Selector       | Element               |
| -------------- | --------------------- |
| `hint.trigger` | Hint trigger element. |
| `hint.content` | Hint content element. |
| `hint.close`   | Hint close element.   |

