---
sidebarDepth: 0
---


# List item




<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

<!-- docs:child of bal-list -->


## Code



### Properties


| Attribute     | Description                                        | Type                                                  | Default              |
| :------------ | :------------------------------------------------- | :---------------------------------------------------- | :------------------- |
| **clickable** | If `true` the list item shows that it is clickable | <code>boolean</code>                                  | <code>false</code>   |
| **disabled**  | If `true` the list item can be hovered             | <code>boolean</code>                                  | <code>false</code>   |
| **href**      | Specifies the URL of the page the link goes to     | <code>string</code>                                   | <code>''</code>      |
| **selected**  | If `true` the list item has a selected theme       | <code>boolean</code>                                  | <code>false</code>   |
| **target**    | Specifies where to open the linked document        | <code>" _parent" , "_blank" , "_self" , "_top"</code> | <code>'_self'</code> |

### Events


| Event           | Description                               | Type                    |
| :-------------- | :---------------------------------------- | :---------------------- |
| **balNavigate** | Emitted when the link element has clicked | <code>MouseEvent</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-list-item.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-list-item)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

