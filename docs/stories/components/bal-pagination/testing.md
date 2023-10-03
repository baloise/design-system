## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                           | Description                                               | Signature                                          |
| --------------------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| `balPaginationFindPages`          | Returns all the page buttons.                             | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balPaginationFindCurrentPage`    | Returns the current listed page button.                   | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balPaginationFindNextButton`     | Returns the next button to navigate to next page.         | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balPaginationFindPreviousButton` | Returns the previous button to navigate to previous page. | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Selectors

| Selector                | Element                                      |
| ----------------------- | -------------------------------------------- |
| `pagination.previous`   | Pagination left control.                     |
| `pagination.next`       | Pagination right control.                    |
| `pagination.list`       | Pagination ul list.                          |
| `pagination.pageNumber` | The number of the page.                      |
| `pagination.pages`      | bal-button of the number of the page..       |
| `pagination.button`     | The native button of the number of the page. |

