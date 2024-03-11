## Testing

The Baloise Design System provides a collection of custom cypress commands for the components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with the components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--documentation">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/ds-testing'

describe('Radio', () => {
  const radioGroup = byTestId('my-radio-group') // [data-testid="my-radio-group"]
  it('should ...', () => {
    cy.get(radioGroup).find('bal-radio').first().check().should('be.checked')
  })
})
```

<!-- END: human documentation -->


### Selectors

| Selector      | Element               |
| ------------- | --------------------- |
| `radio.input` | Native input element. |
| `radio.label` | Native label element. |
| `radio.text`  | Native span element.  |

