---
sidebarDepth: 0
---

# bal-heading

A heading provides some additional helpers.




:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-heading-50></docs-demo-bal-heading-50></ClientOnly>


## Colors

<ClientOnly><docs-demo-bal-heading-51></docs-demo-bal-heading-51></ClientOnly>


:::

::: tab Code

## Properties


| Attribute        | Description                                                                                                                                             | Type                                                         | Default     |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------- | :---------- |
| **color**        | The theme type of the toast. Given by bulma our css framework.                                                                                          | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`        |
| **inverted**     | If `true` the button is inverted                                                                                                                        | `boolean`                                                    | `false`     |
| **level**        | The actual heading level used in the HTML markup.                                                                                                       | `"h1" , "h2" , "h3" , "h4" , "h5" , "h6"`                    | `'h1'`      |
| **spaced**       | If 'false' the margin of the heading gets dropped.                                                                                                      | `boolean`                                                    | `true`      |
| **subtitle**     | If `true` the heading gets displayed slimmer.                                                                                                           | `boolean`                                                    | `false`     |
| **visual-level** | Make the visual style mimic a specific heading level. This option allows you to make e.g. h1 visually look like h3, but still keep it h1 in the markup. | `"h1" , "h2" , "h3" , "h4" , "h5" , "h6" , undefined`        | `undefined` |


:::


::::

## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-heading.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-heading)
