---
sidebarDepth: 0
---

# Hint


<!-- START: human documentation top -->

A hint hides content with some additional description and shows it by clicking the icon.
It can easily combined with the `bal-data` or `bal-field` component.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-hint-54></docs-demo-bal-hint-54></ClientOnly>


### Field

<ClientOnly><docs-demo-bal-hint-55></docs-demo-bal-hint-55></ClientOnly>



## Code



### Properties


| Attribute       | Description                                         | Type                 | Default              |
| :-------------- | :-------------------------------------------------- | :------------------- | :------------------- |
| **close-label** | Text for the close button.                          | <code>string</code>  | <code>'Close'</code> |
| **disabled**    | If `true`, the user cannot interact with the input. | <code>boolean</code> | <code>false</code>   |

### Methods


| Method     | Description           | Signature                                          |
| :--------- | :-------------------- | :------------------------------------------------- |
| **close**  | Closes the hint box.  | <code>close() =&#62; Promise&#60;void&#62;</code>  |
| **open**   | Opens the hint box.   | <code>open() =&#62; Promise&#60;void&#62;</code>   |
| **toggle** | Toggles the hint box. | <code>toggle() =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Hint', () => {
  const hint = dataTestSelector('my-hint') // [data-test-id="my-hint"]
  it('should ...', () => {
    cy.get(hint)
      .click()
      .balHintFindOverlay()
      .should('be.visible')

    cy.get(hint)
      .click()
      .balHintFindOverlay()
      .contains('Spider-Man')

    cy.get(hint)
      .balHintFindCloseButton()
      .contains('Close')
      .click()

    cy.get(hint)
      .balHintFindOverlay()
      .should('not.be.visible')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                    | Description                                                                    | Signature                                  |
| :------------------------- | :----------------------------------------------------------------------------- | :----------------------------------------- |
| **balHintFindOverlay**     | Returns the hint content overlay with the title, content and the close button. | <code>(): Chainable&#60;JQuery&#62;</code> |
| **balHintFindCloseButton** | Returns the close button of the overlay content.                               | <code>(): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-hint.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-hint)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

