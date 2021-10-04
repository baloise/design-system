---
sidebarDepth: 0
search: false
---


# Data Item Value

`bal-data-item` is a child component of `bal-data` that defines the value of the data.




<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

<!-- docs:child of bal-data -->


## Code



### Properties


| Attribute    | Description                                                           | Type                 | Default            |
| :----------- | :-------------------------------------------------------------------- | :------------------- | :----------------- |
| **disabled** | If `true` the button will get disabled.                               | <code>boolean</code> | <code>false</code> |
| **editable** | If `true` a small button with a edit icon will be shown on the right. | <code>boolean</code> | <code>false</code> |

### Events


| Event        | Description                               | Type                    |
| :----------- | :---------------------------------------- | :---------------------- |
| **balBlur**  | Emitted when the edit button loses focus. | <code>void</code>       |
| **balClick** | Emitted when the edit button has focus.   | <code>MouseEvent</code> |
| **balFocus** | Emitted when the edit button has focus.   | <code>void</code>       |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-data-value.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-data-value)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

