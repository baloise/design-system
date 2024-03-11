## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/ds-testing'

describe('Input', () => {
  const input = byTestId('my-input') // [data-testid="my-input"]
  it('should ...', () => {
    cy.get(input).should('have.value', '')
    cy.get(input).type('bubu').should('have.value', 'bubu')
    cy.get(input).clear().should('not.have.value', 'bubu').should('have.value', '')
  })
})
```

<!-- END: human documentation -->


### Selectors

| Selector       | Element               |
| -------------- | --------------------- |
| `input.native` | Native input element. |

