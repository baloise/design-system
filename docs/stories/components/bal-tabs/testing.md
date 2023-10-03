## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                     | Description                                   | Signature                                                                                               |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `balTabsFindActionButton`   | Returns the action button element.            | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                      |
| `balTabsFindItems`          | Returns the tab items.                        | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                      |
| `balTabsFindLabel`          | Returns the label of the tab item.            | `(options?: Partial<Loggable>): Chainable<JQuery>`                                                      |
| `balTabsShouldHaveItems`    | Assert that the tab has the given item.       | `(labels: string[], dataType?: 'label' \| 'value', options?: Partial<Loggable>): Chainable<JQuery>`     |
| `balTabItemShouldHaveState` | Assert that the tab item has the given state. | `(state: 'done' \| 'failed' \| 'active' \| 'disabled', options?: Partial<Loggable>): Chainable<JQuery>` |
| `balTabItemShouldBeActive`  | Assert that the tab item is active or not.    | `(active?: boolean, options?: Partial<Loggable>): Chainable<JQuery>`                                    |


### Selectors

| Selector         | Element         |
| ---------------- | --------------- |
| `tabs.item`      | Tab item.       |
| `tabs.itemLabel` | Tab item label. |

