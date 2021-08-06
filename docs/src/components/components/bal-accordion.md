---
sidebarDepth: 0
---

# Accordion


<!-- START: human documentation top -->

Accordions put users in control of showing or hiding content. Accordions also help us organize information to keep screens less cluttered so that users can accomplish tasks in short, intuitive steps. And accordions can help users find content they need. The component can be used standalone, in combination or inside bal-card.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-accordion-0></docs-demo-bal-accordion-0></ClientOnly>


## Colors

The accordion has 2 colors of themes `is-info` and `is-primary`.

<ClientOnly><docs-demo-bal-accordion-1></docs-demo-bal-accordion-1></ClientOnly>


## Open accordion

<ClientOnly><docs-demo-bal-accordion-2></docs-demo-bal-accordion-2></ClientOnly>


## Trigger label & icon

Use the properties `open-label` & `open-icon` to change the content of the trigger button.

<ClientOnly><docs-demo-bal-accordion-3></docs-demo-bal-accordion-3></ClientOnly>


## With card

<ClientOnly><docs-demo-bal-accordion-4></docs-demo-bal-accordion-4></ClientOnly>


:::

::: tab Code

## Properties


| Attribute       | Description                                             | Type                 | Default     |
| :-------------- | :------------------------------------------------------ | :------------------- | :---------- |
| **card**        | If `true` the accordion is used on the bottom of a card | `boolean`            | `false`     |
| **close-icon**  | Bal-Icon of the close trigger button                    | `string`             | `'minus'`   |
| **close-label** | Label of the close trigger button                       | `string`             | `''`        |
| **color**       | Type defines the theme of the accordion toggle          | `"info" , "primary"` | `'primary'` |
| **is-active**   | Controls if the accordion is collapsed or not           | `boolean`            | `false`     |
| **open-icon**   | Bal-Icon of the open trigger button                     | `string`             | `'plus'`    |
| **open-label**  | Label of the open trigger button                        | `string`             | `''`        |

## Events


| Event           | Description                            | Type      |
| :-------------- | :------------------------------------- | :-------- |
| **balCollapse** | Emmited when the accordion has changed | `boolean` |

## Methods


| Method       | Description            | Signature                   |
| :----------- | :--------------------- | :-------------------------- |
| **`close`**  | Close the accordion    | `close() => Promise<void>`  |
| **`open`**   | Open the accordion     | `open() => Promise<void>`   |
| **`toggle`** | Triggers the accordion | `toggle() => Promise<void>` |

## Testing


AccordionAccessor is a helper object for E-2-E testing.
It maps the accordion behaviour to the `bal-accordion` ui component.

```typescript
import { dataTestSelector, AccordionAccessor } from '@baloise/design-system-components-testing'

describe('Accordion', () => {
  it('should ...', () => {
     const accordion = AccordionAccessor(dataTestSelector('accordion-id')).get()
     accordion.click()
     accordion.assertBodyExists()
     accordion.contains('Label')
 })
})
```

### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **click**                  | Toggle the accordion                                                                                               | `options?: Partial<Cypress.ClickOptions>`                |
| **contains**               | It checks that the accordion label contains the given texts                                                        | `content: string`                                        |
| **assertBodyExists**       | Asserts that accordion is open                                                                                     |                                                          |
| **assertBodyNotExists**    | Asserts that accordion is closed                                                                                   |                                                          |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **assertVisible**          | Assert that the component is visible for the user                                                                  |                                                          |
| **assertNotVisible**       | Assert that the component is not visible for the user                                                              |                                                          |
| **selectNth**              | Selects the option at the given index                                                                              | `index: number`                                          |
| **assertAttributeEquals**  | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude** | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertFullUrl**          | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**          | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                   | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |

:::

::: tab Usage

<!-- START: human documentation usage -->
WIP! Usage content
<!-- END: human documentation usage -->

:::

::: tab Style

<!-- START: human documentation style -->
WIP! Style content
<!-- END: human documentation style -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-accordion.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-accordion)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/accordion.accessor.ts)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

