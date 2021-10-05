---
sidebarDepth: 0
---

# Pagination


<!-- START: human documentation top -->

Pagination allows you to divide large amounts of content into smaller chunks across multiple pages.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

Generally, pagination is used if there are more than 25 items displayed in one view.  The default number displayed will vary depending on the context.

<ClientOnly><docs-demo-bal-pagination-79></docs-demo-bal-pagination-79></ClientOnly>



## Code



### Properties


| Attribute       | Description                                                      | Type                 | Default            |
| :-------------- | :--------------------------------------------------------------- | :------------------- | :----------------- |
| **disabled**    | Disables component                                               | <code>boolean</code> | <code>false</code> |
| **page-range**  | Specify the max visible pages before and after the selected page | <code>number</code>  | <code>2</code>     |
| **total-pages** | The total amount of pages                                        | <code>number</code>  | <code>1</code>     |
| **value**       | Current selected page                                            | <code>number</code>  | <code>1</code>     |

### Events


| Event         | Description                         | Type                |
| :------------ | :---------------------------------- | :------------------ |
| **balChange** | Triggers when a page change happens | <code>number</code> |

### Methods


| Method       | Description            | Signature                                            |
| :----------- | :--------------------- | :--------------------------------------------------- |
| **next**     | Go to the next page    | <code>next() =&#62; Promise&#60;void&#62;</code>     |
| **previous** | Go to the prvious page | <code>previous() =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Pagination', () => {
  const pagination = dataTestSelector('my-pagination') // [data-test-id="my-pagination"]
  it('should ...', () => {
    cy.get(pagination)
      .balPaginationFindPages()
      .first()
      .contains('1')

    cy.get(pagination)
      .balPaginationFindCurrentPage()
      .contains('2')

    cy.get(pagination)
      .balPaginationFindNextButton()
      .click()

    cy.get(pagination)
      .balPaginationFindCurrentPage()
      .contains('3')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                             | Description                                               | Signature                                  |
| :---------------------------------- | :-------------------------------------------------------- | :----------------------------------------- |
| **balPaginationFindPages**          | Returns all the page buttons.                             | <code>(): Chainable&#60;JQuery&#62;</code> |
| **balPaginationFindCurrentPage**    | Returns the current listed page button.                   | <code>(): Chainable&#60;JQuery&#62;</code> |
| **balPaginationFindNextButton**     | Returns the next button to navigate to next page.         | <code>(): Chainable&#60;JQuery&#62;</code> |
| **balPaginationFindPreviousButton** | Returns the previous button to navigate to previous page. | <code>(): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-pagination.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-pagination)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

