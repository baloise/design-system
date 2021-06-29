---
sidebarDepth: 0
---

# bal-timeinput


<!-- START: human documentation top -->

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-timeinput-113></docs-demo-bal-timeinput-113></ClientOnly>


## Inverted style

<ClientOnly><docs-demo-bal-timeinput-114></docs-demo-bal-timeinput-114></ClientOnly>


## Min and max time

<ClientOnly><docs-demo-bal-timeinput-115></docs-demo-bal-timeinput-115></ClientOnly>


## Disabled

<ClientOnly><docs-demo-bal-timeinput-116></docs-demo-bal-timeinput-116></ClientOnly>


:::

::: tab Code

## Properties


| Attribute    | Description                                             | Type      | Default |
| :----------- | :------------------------------------------------------ | :-------- | :------ |
| **disabled** | If `true` the button is disabled                        | `boolean` | `false` |
| **inverted** | If `true` the timeinput can be used on blue background. | `boolean` | `false` |
| **max-time** | Latest date available for selection                     | `string`  | `''`    |
| **min-time** | Earliest date available for selection                   | `string`  | `''`    |
| **value**    | The value of the datepicker with the format `hh:mm`.    | `string`  | `''`    |

## Events


| Event         | Description                                                                                                                                                    | Type         |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| **balBlur**   | Emitted when either the hour or minute input field loses focus.                                                                                                | `FocusEvent` |
| **balChange** | Emitted when either the hour or the minute input has changed.
It will not be triggert if either hour or time input has never been set (i.e. "--" is selected). | `string`     |


:::

::: tab Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-timeinput.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-timeinput)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

