---
sidebarDepth: 0
---

# Heading


<!-- START: human documentation top -->

A heading provides some additional helpers.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Sizes

<ClientOnly><docs-demo-bal-heading-51></docs-demo-bal-heading-51></ClientOnly>


### Colors

<ClientOnly><docs-demo-bal-heading-52></docs-demo-bal-heading-52></ClientOnly>


### Spacing

<ClientOnly><docs-demo-bal-heading-53></docs-demo-bal-heading-53></ClientOnly>



## Code



### Properties


| Attribute        | Description                                                                                                                                             | Type                                                                    | Default                |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- | :--------------------- |
| **color**        | The theme type of the toast. Given by bulma our css framework.                                                                                          | <code>"" , "danger" , "info" , "primary" , "success" , "warning"</code> | <code>''</code>        |
| **inverted**     | If `true` the button is inverted                                                                                                                        | <code>boolean</code>                                                    | <code>false</code>     |
| **level**        | The actual heading level used in the HTML markup.                                                                                                       | <code>"h1" , "h2" , "h3" , "h4" , "h5" , "h6"</code>                    | <code>'h1'</code>      |
| **space**        | Defines at which position the heading has spacing.                                                                                                      | <code>"all" , "bottom" , "none" , "top"</code>                          | <code>'all'</code>     |
| **spaced**       |                                                                                                                                                         | <code>boolean</code>                                                    | <code>true</code>      |
| **subtitle**     | If `true` the heading gets displayed slimmer.                                                                                                           | <code>boolean</code>                                                    | <code>false</code>     |
| **visual-level** | Make the visual style mimic a specific heading level. This option allows you to make e.g. h1 visually look like h3, but still keep it h1 in the markup. | <code>"h1" , "h2" , "h3" , "h4" , "h5" , "h6" , undefined</code>        | <code>undefined</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-heading.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-heading)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

