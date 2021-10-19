---
sidebarDepth: 0
---

# Card


<!-- START: human documentation top -->

Cards contain content and actions about a single subject and can be combined with other components.  

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-card-18></docs-demo-bal-card-18></ClientOnly>


### Inverted style

<ClientOnly><docs-demo-bal-card-19></docs-demo-bal-card-19></ClientOnly>


### With accordion

<ClientOnly><docs-demo-bal-card-20></docs-demo-bal-card-20></ClientOnly>


### With list

The position the action buttons to the right side just add the attribute `right` to the component `bal-card-actions`.

<ClientOnly><docs-demo-bal-card-21></docs-demo-bal-card-21></ClientOnly>


### Summary card

<ClientOnly><docs-demo-bal-card-22></docs-demo-bal-card-22></ClientOnly>


### Service card

<ClientOnly><docs-demo-bal-card-23></docs-demo-bal-card-23></ClientOnly>


### Colors

<ClientOnly><docs-demo-bal-card-24></docs-demo-bal-card-24></ClientOnly>



## Code



### Properties


| Attribute       | Description                                         | Type                                                                                                                                                                                            | Default            |
| :-------------- | :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| **border**      | If `true` a light blue border is added to the card. | <code>boolean</code>                                                                                                                                                                            | <code>false</code> |
| **color**       | Defines the color of the card.                      | <code>"" , "azul" , "blue" , "danger" , "gray" , "green" , "green-light" , "orange" , "pink" , "pink-light" , "primary" , "success" , "violett" , "violett-light" , "warning" , "yellow"</code> | <code>''</code>    |
| **flat**        | If `true` the card loses its shadow.                | <code>boolean</code>                                                                                                                                                                            | <code>false</code> |
| **flat-mobile** | If `true` a card will not have a shadow on mobile.  | <code>boolean</code>                                                                                                                                                                            | <code>false</code> |
| **inverted**    | If `true` the card background color becomes blue.   | <code>boolean</code>                                                                                                                                                                            | <code>false</code> |
| **spacing**     | Defines the size of the padding grid                | <code>"" , "large" , "medium" , "none" , "small"</code>                                                                                                                                         | <code>''</code>    |
| **square**      | If `true` the card loses its border radius.         | <code>boolean</code>                                                                                                                                                                            | <code>false</code> |
| **teaser**      | If `true` the card has a limited width on desktop.  | <code>boolean</code>                                                                                                                                                                            | <code>false</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-card.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-card)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

