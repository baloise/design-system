## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('Hint', () => {
  const hint = byTestId('my-hint') // [data-testid="my-hint"]
  it('should ...', () => {
    cy.get(hint).click().balHintFindOverlay().should('be.visible')

    cy.get(hint).click().balHintFindOverlay().contains('Spider-Man')

    cy.get(hint).balHintFindCloseButton().contains('Close').click()

    cy.get(hint).balHintFindOverlay().should('not.be.visible')
  })
})
```

<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                  | Description                                                                    | Signature                                          |
| ------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| `balHintFindOverlay`     | Returns the hint content overlay with the title, content and the close button. | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balHintFindCloseButton` | Returns the close button of the overlay content.                               | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Component Element Selectors

| Selector       | Element               |
| -------------- | --------------------- |
| `hint.trigger` | Hint trigger element. |
| `hint.content` | Hint content element. |
| `hint.close`   | Hint close element.   |

