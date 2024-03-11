## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```ts
import { byTestId } from '@baloise/ds-testing'

describe('Snackbar', () => {
  it('should ...', () => {
    cy.balSnackbarFind().first().contains('Hi I am a default Snack!')
  })
})
```

<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command           | Description                    | Signature                                 |
| ----------------- | ------------------------------ | ----------------------------------------- |
| `balSnackbarFind` | Returns the visible snackbars. | (options?: Partial\<Loggable>): Chainable |

### Selectors

| Selector           | Element                   |
| ------------------ | ------------------------- |
| `snackbar.main`    | Snackbar element.         |
| `snackbar.heading` | Snackbar heading element. |
| `snackbar.label`   | Snackbar label element.   |
| `snackbar.close`   | Snackbar close element.   |
| `snackbar.action`  | Snackbar action element.  |
