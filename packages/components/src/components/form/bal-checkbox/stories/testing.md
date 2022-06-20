## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-nest-testing'

describe('Checkbox', () => {
  const checkbox = byTestId('my-checkbox') // [data-testid="my-checkbox"]
  it('should ...', () => {
    cy.get(checkbox).contains('Label').check().should('be.checked').should('not.be.disabled')
  })
})
```

<!-- END: human documentation -->
