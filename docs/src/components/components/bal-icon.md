---
sidebarDepth: 0
---

# Icon


<!-- START: human documentation top -->

All our icons are pure svg files. To add a new icon just place your svg file into the folder `packages/library/src/components/bal-icon/svg`.
Then the build script will automatically optimize the svg and create its own web component.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-icon-57></docs-demo-bal-icon-57></ClientOnly>


### Size

Here is how you can change the size:

<ClientOnly><docs-demo-bal-icon-58></docs-demo-bal-icon-58></ClientOnly>


### Colors

<ClientOnly><docs-demo-bal-icon-59></docs-demo-bal-icon-59></ClientOnly>


### Custom Color

Here is how you can change the color:

<ClientOnly><docs-demo-bal-icon-60></docs-demo-bal-icon-60></ClientOnly>



## Code



### Properties


| Attribute    | Description                                                     | Type                                                                                                         | Default             |
| :----------- | :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------ |
| **color**    | The theme type of the button. Given by bulma our css framework. | <code>"danger" , "info" , "info-light" , "link" , "primary" , "primary-light" , "success" , "warning"</code> | <code>'info'</code> |
| **inverted** | If `true` the button is inverted                                | <code>boolean</code>                                                                                         | <code>false</code>  |
| **name**     | Name of the baloise icon.                                       | <code>string</code>                                                                                          | <code>''</code>     |
| **rotate**   | If `true` the icon rotates like for a loading spinner           | <code>boolean</code>                                                                                         | <code>false</code>  |
| **size**     | Defines the size of the icon.                                   | <code>"" , "large" , "medium" , "small" , "xsmall"</code>                                                    | <code>''</code>     |
| **svg**      | Svg content.                                                    | <code>string</code>                                                                                          | <code>''</code>     |
| **turn**     | If `true` the icon is rotated 180deg                            | <code>boolean</code>                                                                                         | <code>false</code>  |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-icon.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-icon)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

