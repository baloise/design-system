## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```ts
import { byTestId } from '@baloise/design-system-testing'

describe('Steps', () => {
  const steps = byTestId('my-steps') // [data-testid="my-steps"]
  it('should ...', () => {
    cy.get(steps).select('Step Label B').should('have.value', 'Step Label B')
    cy.get(steps).balStepsFindItems().first().balStepItemShouldHaveState('done')
  })
})
```

<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                          | Description                                       | Signature                                                                                             |
| -------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `balStepsFindItems`              | Returns the tab items.                            | (options?: Partial<Loggable>): Chainable<JQuery>                                                      |
| `balStepsFindLabel`              | Returns the label of the tab item.                | (options?: Partial<Loggable>): Chainable<JQuery>                                                      |
| `balStepsShouldHaveItems`        | Assert that the tab has the given item.           | (labels: string[], dataType?: 'label' \| 'value', options?: Partial<Loggable>): Chainable<JQuery>     |
| `balStepsItemShouldHaveState`    | Assert that the tab item has the given state.     | (state: 'done' \| 'failed' \| 'active' \| 'disabled', options?: Partial<Loggable>): Chainable<JQuery> |
| `balStepsItemShouldNotHaveState` | Assert that the tab item has not the given state. | (state: 'done' \| 'failed' \| 'active' \| 'disabled', options?: Partial<Loggable>): Chainable<JQuery> |


### Selectors

| Selector            | Element           |
| ------------------- | ----------------- |
| `steps.option`      | Step option       |
| `steps.optionLabel` | Step option label |

