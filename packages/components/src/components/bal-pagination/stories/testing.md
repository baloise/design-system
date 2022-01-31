## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('Pagination', () => {
  const pagination = byTestId('my-pagination') // [data-testid="my-pagination"]
  it('should ...', () => {
    cy.get(pagination).balPaginationFindPages().first().contains('1')
    cy.get(pagination).balPaginationFindCurrentPage().contains('2')
    cy.get(pagination).balPaginationFindNextButton().click()
    cy.get(pagination).balPaginationFindCurrentPage().contains('3')
  })
})
```

<!-- END: human documentation -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                           | Description                                               | Signature               |
| --------------------------------- | --------------------------------------------------------- | ----------------------- |
| `balPaginationFindPages`          | Returns all the page buttons.                             | `(): Chainable<JQuery>` |
| `balPaginationFindCurrentPage`    | Returns the current listed page button.                   | `(): Chainable<JQuery>` |
| `balPaginationFindNextButton`     | Returns the next button to navigate to next page.         | `(): Chainable<JQuery>` |
| `balPaginationFindPreviousButton` | Returns the previous button to navigate to previous page. | `(): Chainable<JQuery>` |
