---
sidebarDepth: 0
search: false
---


# Tab Item

`bal-tab-item` is a child component of `bal-tabs`.




<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

<!-- docs:child of bal-tabs -->


## Code



### Properties


| Attribute    | Description                                             | Type                 | Default            |
| :----------- | :------------------------------------------------------ | :------------------- | :----------------- |
| **active**   | Tell's if the tab is active and the content is visible. | <code>boolean</code> | <code>false</code> |
| **bubble**   | If `true` a small red bubble is added to the tab.       | <code>boolean</code> | <code>false</code> |
| **disabled** | If `true` the tab is disabled.                          | <code>boolean</code> | <code>false</code> |
| **done**     | If `true` the step is marked as done.                   | <code>boolean</code> | <code>false</code> |
| **failed**   | If `true` the step is marked as failed.                 | <code>boolean</code> | <code>false</code> |
| **href**     | Link to path.                                           | <code>string</code>  | <code>''</code>    |
| **label**    | Label for the tab.                                      | <code>string</code>  | <code>''</code>    |
| **prevent**  | Tell's if the linking is done by a router.              | <code>boolean</code> | <code>false</code> |
| **value**    | This is the key of the tab.                             | <code>string</code>  | <code>''</code>    |

### Events


| Event           | Description                               | Type                    |
| :-------------- | :---------------------------------------- | :---------------------- |
| **balNavigate** | Emitted when the link element has clicked | <code>MouseEvent</code> |

### Methods


| Method         | Description                               | Signature                                                            |
| :------------- | :---------------------------------------- | :------------------------------------------------------------------- |
| **getOptions** | Options of the tab like label, value etc. | <code>getOptions() =&#62; Promise&#60;BalTabOption&#62;</code>       |
| **setActive**  | Sets the tab active.                      | <code>setActive(active: boolean) =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-tab-item.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-tab-item)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

