---
sidebarDepth: 0
---

# bal-list


<!-- START: human documentation top -->

A list present content in a way that makes it easy to identify a specific item in a collection.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-list-62></docs-demo-bal-list-62></ClientOnly>


## With borders

<ClientOnly><docs-demo-bal-list-63></docs-demo-bal-list-63></ClientOnly>


## Inverted

<ClientOnly><docs-demo-bal-list-64></docs-demo-bal-list-64></ClientOnly>


## With Icons

<ClientOnly><docs-demo-bal-list-65></docs-demo-bal-list-65></ClientOnly>


## Link

<ClientOnly><docs-demo-bal-list-66></docs-demo-bal-list-66></ClientOnly>


:::

::: tab Code

## Properties


| Attribute    | Description                                        | Type      | Default |
| :----------- | :------------------------------------------------- | :-------- | :------ |
| **border**   | If `true` each list item has a bottom border       | `boolean` | `false` |
| **disabled** | If `true` the list item can be hovered             | `boolean` | `false` |
| **inverted** | If `true` the list can be used on a dark backround | `boolean` | `false` |

## Testing




### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **select**                 | Selects the element from the list                                                                                  | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **contains**               | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertIsDisabled**       | Asserts that the element is disabled                                                                               |                                                          |
| **assertIsEnabled**        | Asserts that the element is enabled and can be used                                                                |                                                          |
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

<!-- END: human documentation usage -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-list.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-list)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/list.accessor.ts)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

