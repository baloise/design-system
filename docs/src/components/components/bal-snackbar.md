---
sidebarDepth: 0
---

# bal-snackbar

## Usage

Toast can be created with the `balScnackbarController`. The default duration is 5000 milliseconds.

```typescript
import { balScnackbarController } from '@baloise/design-system-components'

balScnackbarController.create({ message: 'Hi I am a default Toast!', duration: 1000 })
```


<!-- START: human documentation top -->

A snackbar is used to inform the user with a simple text message and a action.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-snackbar-96></docs-demo-bal-snackbar-96></ClientOnly>


## Colors

<ClientOnly><docs-demo-bal-snackbar-97></docs-demo-bal-snackbar-97></ClientOnly>


:::

::: tab Code

## Properties


| Attribute    | Description                                                       | Type                                                         | Default |
| :----------- | :---------------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **action**   | Label text for the action button                                  | `string`                                                     | `''`    |
| **color**    | The theme type of the snackbar. Given by bulma our css framework. | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **duration** | The duration of the snackbar                                      | `number`                                                     | `0`     |
| **icon**     | The icon of the snackbar header                                   | `string`                                                     | `''`    |
| **message**  | The message of the snackbar                                       | `string`                                                     | `''`    |
| **subject**  | The subject of the snackbar header                                | `string`                                                     | `''`    |

## Events


| Event         | Description                               | Type     |
| :------------ | :---------------------------------------- | :------- |
| **balAction** | Emitted when the action button is clicked | `string` |
| **balClose**  | Emitted when snackbar is closed           | `string` |

## Methods


| Method        | Description                                        | Signature                                    |
| :------------ | :------------------------------------------------- | :------------------------------------------- |
| **`close`**   | Closes this snackbar                               | `close() => Promise<void>`                   |
| **`closeIn`** | Closes the snackbar after the given duration in ms | `closeIn(duration: number) => Promise<void>` |


:::

::: tab Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-snackbar.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-snackbar)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balSnackbar"></docs-component-script>
</ClientOnly>
