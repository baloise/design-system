## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('Accordion', () => {
  const accordion = byTestId('my-accordion') // [data-testid="my-accordion"]
  it('should ...', () => {
    cy.get(accordion).contains('Show more')
    cy.get(accordion).balAccordionIsClosed()
    cy.get(accordion).click().balAccordionIsOpen()
    cy.get(page.accordion).contains('Show less')
    cy.get(accordion).click().balAccordionIsClosed()
  })
})
```

<!-- END: human documentation -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                | Description                         | Signature               |
| ---------------------- | ----------------------------------- | ----------------------- |
| `balAccordionIsOpen`   | Asserts if the accordion is open.   | `(): Chainable<JQuery>` |
| `balAccordionIsClosed` | Asserts if the accordion is closed. | `(): Chainable<JQuery>` |
