---
sidebarDepth: 0
---


# bal-tab-item

`bal-tab-item` is a child component of `bal-tabs`.




<!-- docs:child of bal-tabs -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Code

## Properties


| Attribute    | Description                                             | Type      | Default |
| :----------- | :------------------------------------------------------ | :-------- | :------ |
| **active**   | Tell's if the tab is active and the content is visible. | `boolean` | `false` |
| **bubble**   | If `true` a small red bubble is added to the tab.       | `boolean` | `false` |
| **disabled** | If `true` the tab is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is marked as done.                   | `boolean` | `false` |
| **failed**   | If `true` the step is marked as failed.                 | `boolean` | `false` |
| **href**     | Link to path.                                           | `string`  | `''`    |
| **label**    | Label for the tab.                                      | `string`  | `''`    |
| **prevent**  | Tell's if the linking is done by a router.              | `boolean` | `false` |
| **value**    | This is the key of the tab.                             | `string`  | `''`    |

## Events


| Event           | Description                               | Type         |
| :-------------- | :---------------------------------------- | :----------- |
| **balNavigate** | Emitted when the link element has clicked | `MouseEvent` |

## Methods


| Method           | Description                               | Signature                                     |
| :--------------- | :---------------------------------------- | :-------------------------------------------- |
| **`getOptions`** | Options of the tab like label, value etc. | `getOptions() => Promise<BalTabOption>`       |
| **`setActive`**  | Sets the tab active.                      | `setActive(active: boolean) => Promise<void>` |


:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-tab-item.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-tab-item)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

