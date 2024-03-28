## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                        | Description                                                | Signature                                                                                  |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `balDropdownFindOptions`       | Returns the select options.                                | (options?: Partial\<Loggable>): Chainable                                                  |
| `balDropdownFindChips`         | Returns the closable select chips (only with multiselect). | (options?: Partial\<Loggable>): Chainable                                                  |
| `balDropdownShouldHaveOptions` | Asserts that the select has the given options.             | (labels: string[], dataType?: 'label' \| 'value', options?: Partial\<Loggable>): Chainable |


### Selectors

| Selector           | Element               |
| ------------------ | --------------------- |
| `dropdown.input`   | Native input element. |
| `dropdown.options` | Select option.        |

