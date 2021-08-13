---
sidebarDepth: 0
---

# Timeinput


<!-- START: human documentation top -->

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-timeinput-117></docs-demo-bal-timeinput-117></ClientOnly>


### Inverted style

<ClientOnly><docs-demo-bal-timeinput-118></docs-demo-bal-timeinput-118></ClientOnly>


### Min and max time

<ClientOnly><docs-demo-bal-timeinput-119></docs-demo-bal-timeinput-119></ClientOnly>


### Disabled

<ClientOnly><docs-demo-bal-timeinput-120></docs-demo-bal-timeinput-120></ClientOnly>



## Code

### Properties


| Attribute    | Description                                             | Type      | Default |
| :----------- | :------------------------------------------------------ | :-------- | :------ |
| **disabled** | If `true` the button is disabled                        | `boolean` | `false` |
| **inverted** | If `true` the timeinput can be used on blue background. | `boolean` | `false` |
| **max-time** | Latest date available for selection                     | `string`  | `''`    |
| **min-time** | Earliest date available for selection                   | `string`  | `''`    |
| **value**    | The value of the datepicker with the format `hh:mm`.    | `string`  | `''`    |

### Events


| Event         | Description                                                                                                                                                    | Type         |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| **balBlur**   | Emitted when either the hour or minute input field loses focus.                                                                                                | `FocusEvent` |
| **balChange** | Emitted when either the hour or the minute input has changed.
It will not be triggert if either hour or time input has never been set (i.e. "--" is selected). | `string`     |


## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-timeinput.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-timeinput)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

