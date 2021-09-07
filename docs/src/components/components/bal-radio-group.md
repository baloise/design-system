---
sidebarDepth: 0
---


# Radio Group




<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

<!-- docs:child of bal-radio -->


## Code



### Properties


| Attribute     | Description                                                     | Type                                   | Default                   |
| :------------ | :-------------------------------------------------------------- | :------------------------------------- | :------------------------ |
| **disabled**  | If `true`, the user cannot interact with the radios.            | <code>boolean , undefined</code>       | <code>undefined</code>    |
| **interface** | Defines the layout of the radio button                          | <code>"radio" , "select-button"</code> | <code>'radio'</code>      |
| **inverted**  | If `true` the component can be used on dark background          | <code>boolean</code>                   | <code>false</code>        |
| **name**      | The name of the control, which is submitted with the form data. | <code>string</code>                    | <code>this.inputId</code> |
| **value**     | The value of the control.                                       | <code>string</code>                    | <code>''</code>           |

### Events


| Event         | Description                                    | Type                |
| :------------ | :--------------------------------------------- | :------------------ |
| **balChange** | Emitted when the checked property has changed. | <code>string</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-radio-group.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-radio-group)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

