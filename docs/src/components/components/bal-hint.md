---
sidebarDepth: 0
---

# bal-hint


<!-- START: human documentation top -->

A hint hides content with some additional description and shows it by clicking the icon.
It can easily combined with the `bal-data` or `bal-field` component.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-hint-52></docs-demo-bal-hint-52></ClientOnly>


## Field

<ClientOnly><docs-demo-bal-hint-53></docs-demo-bal-hint-53></ClientOnly>


:::

::: tab Code

## Properties


| Attribute       | Description                                         | Type      | Default   |
| :-------------- | :-------------------------------------------------- | :-------- | :-------- |
| **close-label** | Text for the close button.                          | `string`  | `'Close'` |
| **disabled**    | If `true`, the user cannot interact with the input. | `boolean` | `false`   |

## Methods


| Method       | Description           | Signature                   |
| :----------- | :-------------------- | :-------------------------- |
| **`close`**  | Closes the hint box.  | `close() => Promise<void>`  |
| **`open`**   | Opens the hint box.   | `open() => Promise<void>`   |
| **`toggle`** | Toggles the hint box. | `toggle() => Promise<void>` |


:::

::: tab Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-hint.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-hint)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

