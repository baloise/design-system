---
sidebarDepth: 0
---

# bal-icon


<!-- START: human documentation top -->

All our icons are pure svg files. To add a new icon just place your svg file into the folder `packages/library/src/components/bal-icon/svg`.
Then the build script will automatically optimize the svg and create its own web component.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-icon-54></docs-demo-bal-icon-54></ClientOnly>


## Size

Here is how you can change the size:

<ClientOnly><docs-demo-bal-icon-55></docs-demo-bal-icon-55></ClientOnly>


## Colors

<ClientOnly><docs-demo-bal-icon-56></docs-demo-bal-icon-56></ClientOnly>


## Custom Color

Here is how you can change the color:

<ClientOnly><docs-demo-bal-icon-57></docs-demo-bal-icon-57></ClientOnly>


:::

::: tab Code

## Properties


| Attribute    | Description                                                     | Type                                                                                              | Default  |
| :----------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :------- |
| **color**    | The theme type of the button. Given by bulma our css framework. | `"danger" , "info" , "info-light" , "link" , "primary" , "primary-light" , "success" , "warning"` | `'info'` |
| **inverted** | If `true` the button is inverted                                | `boolean`                                                                                         | `false`  |
| **name**     | Name of the baloise icon.                                       | `string`                                                                                          | `''`     |
| **rotate**   | If `true` the icon rotates like for a loading spinner           | `boolean`                                                                                         | `false`  |
| **size**     | Defines the size of the icon.                                   | `"" , "large" , "medium" , "small" , "xsmall"`                                                    | `''`     |
| **svg**      | Svg content.                                                    | `string`                                                                                          | `''`     |
| **turn**     | If `true` the icon is rotated 180deg                            | `boolean`                                                                                         | `false`  |


:::

::: tab Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-icon.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-icon)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

