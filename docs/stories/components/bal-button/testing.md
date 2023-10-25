## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('Button', () => {
  const button = byTestId('my-button') // [data-testid="my-button"]
  it('should ...', () => {
    cy.get(button).contains('Label').click().should('not.be.disabled')
  })
})
```

<!-- END: human documentation -->


### Selectors

| Selector        | Element                |
| --------------- | ---------------------- |
| `button.native` | Native button element. |
| `button.label`  | Button label.          |

