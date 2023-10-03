## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                          | Description                                       | Signature                                                                                               |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `balStepsFindItems`              | Returns the tab items.                            | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                      |
| `balStepsFindLabel`              | Returns the label of the tab item.                | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                      |
| `balStepsShouldHaveItems`        | Assert that the tab has the given item.           | `(labels: string[], dataType?: 'label' \| 'value', options?: Partial<Loggable>): Chainable<JQuery>`     |
| `balStepsItemShouldHaveState`    | Assert that the tab item has the given state.     | `(state: 'done' \| 'failed' \| 'active' \| 'disabled', options?: Partial<Loggable>): Chainable<JQuery>` |
| `balStepsItemShouldNotHaveState` | Assert that the tab item has not the given state. | `(state: 'done' \| 'failed' \| 'active' \| 'disabled', options?: Partial<Loggable>): Chainable<JQuery>` |


### Component Element Selectors

| Selector            | Element           |
| ------------------- | ----------------- |
| `steps.option`      | Step option       |
| `steps.optionLabel` | Step option label |

