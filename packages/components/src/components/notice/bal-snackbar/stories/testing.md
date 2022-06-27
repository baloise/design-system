## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-nest-testing'

describe('Snackbar', () => {
  it('should ...', () => {
    cy.balSnackbarFind().first().contains('Hi I am a default Snack!')
  })
})
```

<!-- END: human documentation -->

### Custom Commands

A list of the custom commands for this specific component.

| Command           | Description                    | Signature               |
| ----------------- | ------------------------------ | ----------------------- |
| `balSnackbarFind` | Returns the visible snackbars. | `(): Chainable<JQuery>` |
