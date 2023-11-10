## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('Checkbox', () => {
  const checkbox = byTestId('my-checkbox') // [data-testid="my-checkbox"]
  it('should ...', () => {
    cy.get(checkbox).contains('Label').check().should('be.checked').should('not.be.disabled')
  })
})
```

<!-- END: human documentation -->


### Selectors

| Selector         | Element               |
| ---------------- | --------------------- |
| `checkbox.input` | Native input element. |
| `checkbox.label` | Label element.        |
| `checkbox.text`  | Label span element.   |

