## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```ts
import { byTestId } from '@baloise/design-system-testing'

describe('Tabs', () => {
  const tabs = byTestId('my-tabs') // [data-testid="my-tabs"]
  const steps = byTestId('my-steps') // [data-testid="my-steps"]
  it('should ...', () => {
    cy.get(tabs).select('Tab B').should('have.value', 'Tab B')
    cy.get(tabs).balTabsFindActionButton().contains('Action')
    cy.get(steps).balTabsFindItems().first().balTabItemShouldHaveState('done')
  })
})
```

<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                     | Description                                   | Signature                                                                                      |
| --------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `balTabsFindActionButton`   | Returns the action button element.            | (options?: Partial\<Loggable>): Chainable                                                      |
| `balTabsFindItems`          | Returns the tab items.                        | (options?: Partial\<Loggable>): Chainable                                                      |
| `balTabsFindLabel`          | Returns the label of the tab item.            | (options?: Partial\<Loggable>): Chainable                                                      |
| `balTabsShouldHaveItems`    | Assert that the tab has the given item.       | (labels: string[], dataType?: 'label' \| 'value', options?: Partial\<Loggable>): Chainable     |
| `balTabItemShouldHaveState` | Assert that the tab item has the given state. | (state: 'done' \| 'failed' \| 'active' \| 'disabled', options?: Partial\<Loggable>): Chainable |
| `balTabItemShouldBeActive`  | Assert that the tab item is active or not.    | (active?: boolean, options?: Partial\<Loggable>): Chainable                                    |


### Selectors

| Selector         | Element         |
| ---------------- | --------------- |
| `tabs.item`      | Tab item.       |
| `tabs.itemLabel` | Tab item label. |

