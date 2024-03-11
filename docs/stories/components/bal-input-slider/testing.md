## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/ds-testing'

describe('Input Slider', () => {
  const slider = byTestId('my-slider') // [data-testid="my-slider"]
  it('should ...', () => {
    cy.get(slider).type('30').should('have.value', '30')
  })
})
```

<!-- END: human documentation -->
