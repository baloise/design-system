## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Input', () => {
  const input = dataTestSelector('my-input') // [data-test-id="my-input"]
  it('should ...', () => {
    cy.get(input).should('have.value', '')
    cy.get(input).type('bubu').should('have.value', 'bubu')
    cy.get(input).clear().should('not.have.value', 'bubu').should('have.value', '')
  })
})
```

<!-- END: human documentation -->
