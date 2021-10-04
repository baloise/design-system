---
sidebarDepth: 0
search: false
---


# Card Button

`bal-card-button` is a child component of `bal-card` that sets a block button at the end of the card. Good to use for edit functionality.




<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

<!-- docs:child of bal-card -->


## Code



### Properties


| Attribute     | Description                                                                         | Type                                                  | Default               |
| :------------ | :---------------------------------------------------------------------------------- | :---------------------------------------------------- | :-------------------- |
| **disabled**  | If `true`, the user cannot interact with the button.                                | <code>boolean</code>                                  | <code>false</code>    |
| **href**      | Specifies the URL of the page the link goes to                                      | <code>string , undefined</code>                       |                       |
| **icon**      | Name of the icon like `edit`.                                                       | <code>string</code>                                   | <code>''</code>       |
| **iconRight** | Name of the right button icon                                                       | <code>string</code>                                   | <code>''</code>       |
| **loading**   | If `true` the label is hidden and a loading spinner is shown instead.               | <code>boolean</code>                                  | <code>false</code>    |
| **target**    | Specifies where to display the linked URL. Only applies when an `href` is provided. | <code>" _parent" , "_blank" , "_self" , "_top"</code> | <code>'_self'</code>  |
| **type**      | The type of button.                                                                 | <code>"button" , "reset" , "submit"</code>            | <code>'button'</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-card-button.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-card-button)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

