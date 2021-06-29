---
sidebarDepth: 0
---

# bal-card


<!-- START: human documentation top -->

Cards contain content and actions about a single subject and can be combined with other components.  

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-card-16></docs-demo-bal-card-16></ClientOnly>


## Inverted style

<ClientOnly><docs-demo-bal-card-17></docs-demo-bal-card-17></ClientOnly>


## With accordion

<ClientOnly><docs-demo-bal-card-18></docs-demo-bal-card-18></ClientOnly>


## With list

The position the action buttons to the right side just add the attribute `right` to the component `bal-card-actions`.

<ClientOnly><docs-demo-bal-card-19></docs-demo-bal-card-19></ClientOnly>


## Summary card

<ClientOnly><docs-demo-bal-card-20></docs-demo-bal-card-20></ClientOnly>


## Service card

<ClientOnly><docs-demo-bal-card-21></docs-demo-bal-card-21></ClientOnly>


## Colors

<ClientOnly><docs-demo-bal-card-22></docs-demo-bal-card-22></ClientOnly>


:::

::: tab Code

## Properties


| Attribute       | Description                                         | Type                                                         | Default |
| :-------------- | :-------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **border**      | If `true` a light blue border is added to the card. | `boolean`                                                    | `false` |
| **color**       | Defines the color of the card.                      | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **flat**        | If `true` the card loses its shadow.                | `boolean`                                                    | `false` |
| **flat-mobile** | If `true` a card will not have a shadow on mobile.  | `boolean`                                                    | `false` |
| **inverted**    | If `true` the card background color becomes blue.   | `boolean`                                                    | `false` |
| **padded**      |                                                     | `boolean`                                                    | `false` |
| **padding**     | Defines the size of the padding grid                | `"" , "form" , "pure"`                                       | `''`    |
| **square**      | If `true` the card loses its border radius.         | `boolean`                                                    | `false` |
| **teaser**      | If `true` the card has a limited width on desktop.  | `boolean`                                                    | `false` |


:::

::: tab Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

:::


::::

## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-card.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-card)
