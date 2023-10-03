## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                      | Description                                                | Signature                                                                                           |
| ---------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `balSelectFindOptions`       | Returns the select options.                                | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                  |
| `balSelectFindChips`         | Returns the closable select chips (only with multiselect). | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                  |
| `balSelectShouldHaveOptions` | Asserts that the select has the given options.             | `(labels: string[], dataType?: 'label' \| 'value', options?: Partial<Loggable>): Chainable<JQuery>` |


### Selectors

| Selector         | Element               |
| ---------------- | --------------------- |
| `select.input`   | Native input element. |
| `select.options` | Select option.        |
| `select.chips`   | Multi select tag .    |

