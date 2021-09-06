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

| Attribute       | Description                                             | Type                 | Default     |
| :-------------- | :------------------------------------------------------ | :------------------- | :---------- |
| **card**        | If `true` the accordion is used on the bottom of a card | `boolean`            | `false`     |
| **close-icon**  | Bal-Icon of the close trigger button                    | `string`             | `'minus'`   |
| **close-label** | Label of the close trigger button                       | `string`             | `''`        |
| **color**       | Type defines the theme of the accordion toggle          | `"info" , "primary"` | `'primary'` |
| **is-active**   | Controls if the accordion is collapsed or not           | `boolean`            | `false`     |
| **open-icon**   | Bal-Icon of the open trigger button                     | `string`             | `'plus'`    |
| **open-label**  | Label of the open trigger button                        | `string`             | `''`        |

### Events

| Event           | Description                            | Type      |
| :-------------- | :------------------------------------- | :-------- |
| **balCollapse** | Emmited when the accordion has changed | `boolean` |

### Methods

| Method       | Description            | Signature                   |
| :----------- | :--------------------- | :-------------------------- |
| **`close`**  | Close the accordion    | `close() => Promise<void>`  |
| **`open`**   | Open the accordion     | `open() => Promise<void>`   |
| **`toggle`** | Triggers the accordion | `toggle() => Promise<void>` |

### Testing

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

#### Commands

| Command                  | Description                                                                               | Signature               |
| :----------------------- | :---------------------------------------------------------------------------------------- | :---------------------- |
| **balAccordionIsOpen**   | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>` |
| **balAccordionIsClosed** | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>` |

## Usage

<!-- START: human documentation usage -->

WIP! Usage content

<!-- END: human documentation usage -->

## Style

<!-- START: human documentation style -->

WIP! Style content

<!-- END: human documentation style -->

## Edit this page on Github

- [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-accordion.md)
- [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-accordion)
- [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).
