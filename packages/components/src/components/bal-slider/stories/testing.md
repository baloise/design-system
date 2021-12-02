## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Slider', () => {
  const slider = dataTestSelector('my-slider') // [data-test-id="my-slider"]
  it('should ...', () => {
    cy.get(slider).type('30').should('have.value', '30')
  })
})
```

<!-- END: human documentation -->
