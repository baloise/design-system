## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('Radio', () => {
  const radioGroup = byTestId('my-radio-group') // [data-testid="my-radio-group"]
  it('should ...', () => {
    cy.get(radioGroup).find('bal-radio').first().check().should('be.checked')
  })
})
```

<!-- END: human documentation -->
