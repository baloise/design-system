---
sidebarDepth: 0
---

# Accordion


<!-- START: human documentation top -->

Accordions put users in control of showing or hiding content. Accordions also help us organize information to keep screens less cluttered so that users can accomplish tasks in short, intuitive steps. And accordions can help users find content they need. The component can be used standalone, in combination or inside bal-card.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-accordion-0></docs-demo-bal-accordion-0></ClientOnly>


### Colors

The accordion has 2 colors of themes `is-info` and `is-primary`.

<ClientOnly><docs-demo-bal-accordion-1></docs-demo-bal-accordion-1></ClientOnly>


### Open accordion

<ClientOnly><docs-demo-bal-accordion-2></docs-demo-bal-accordion-2></ClientOnly>


### Trigger label & icon

Use the properties `open-label` & `open-icon` to change the content of the trigger button.

<ClientOnly><docs-demo-bal-accordion-3></docs-demo-bal-accordion-3></ClientOnly>


### With card

<ClientOnly><docs-demo-bal-accordion-4></docs-demo-bal-accordion-4></ClientOnly>



## Code



### Properties


| Attribute       | Description                                             | Type                            | Default                |
| :-------------- | :------------------------------------------------------ | :------------------------------ | :--------------------- |
| **card**        | If `true` the accordion is used on the bottom of a card | <code>boolean</code>            | <code>false</code>     |
| **close-icon**  | Bal-Icon of the close trigger button                    | <code>string</code>             | <code>'minus'</code>   |
| **close-label** | Label of the close trigger button                       | <code>string</code>             | <code>''</code>        |
| **color**       | Type defines the theme of the accordion toggle          | <code>"info" , "primary"</code> | <code>'primary'</code> |
| **is-active**   | Controls if the accordion is collapsed or not           | <code>boolean</code>            | <code>false</code>     |
| **open-icon**   | Bal-Icon of the open trigger button                     | <code>string</code>             | <code>'plus'</code>    |
| **open-label**  | Label of the open trigger button                        | <code>string</code>             | <code>''</code>        |

### Events


| Event           | Description                            | Type                 |
| :-------------- | :------------------------------------- | :------------------- |
| **balCollapse** | Emmited when the accordion has changed | <code>boolean</code> |

### Methods


| Method     | Description            | Signature                                          |
| :--------- | :--------------------- | :------------------------------------------------- |
| **close**  | Close the accordion    | <code>close() =&#62; Promise&#60;void&#62;</code>  |
| **open**   | Open the accordion     | <code>open() =&#62; Promise&#60;void&#62;</code>   |
| **toggle** | Triggers the accordion | <code>toggle() =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Accordion', () => {
  const accordion = dataTestSelector('my-accordion') // [data-test-id="my-accordion"]
  it('should ...', () => {
    cy.get(accordion).contains('Details einblenden')
    cy.get(accordion).balAccordionIsClosed()
    cy.get(accordion)
      .click()
      .balAccordionIsOpen()
    cy.get(page.accordion).contains('Details ausblenden')
    cy.get(accordion)
      .click()
      .balAccordionIsClosed()
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                  | Description                         | Signature                                  |
| :----------------------- | :---------------------------------- | :----------------------------------------- |
| **balAccordionIsOpen**   | Asserts if the accordion is open.   | <code>(): Chainable&#60;JQuery&#62;</code> |
| **balAccordionIsClosed** | Asserts if the accordion is closed. | <code>(): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

WIP! Usage content

<!-- END: human documentation usage -->

## Style

<!-- START: human documentation style -->

WIP! Style content

<!-- END: human documentation style -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-accordion.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-accordion)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

