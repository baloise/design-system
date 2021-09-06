---
sidebarDepth: 0
---

# Radio <Badge text="Two-way binding"/>


<!-- START: human documentation top -->

A radio input is normally displayed in a radio group. The user can only select one option from a number of choices.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-radio-80></docs-demo-bal-radio-80></ClientOnly>


### Inverted

<ClientOnly><docs-demo-bal-radio-81></docs-demo-bal-radio-81></ClientOnly>


### With Links

<ClientOnly><docs-demo-bal-radio-82></docs-demo-bal-radio-82></ClientOnly>


### Radio Boxes

<ClientOnly><docs-demo-bal-radio-83></docs-demo-bal-radio-83></ClientOnly>


### Radio List

<ClientOnly><docs-demo-bal-radio-84></docs-demo-bal-radio-84></ClientOnly>


### Select Button

<ClientOnly><docs-demo-bal-radio-85></docs-demo-bal-radio-85></ClientOnly>


#### Inverted

<ClientOnly><docs-demo-bal-radio-86></docs-demo-bal-radio-86></ClientOnly>



## Code



### Properties


| Attribute        | Description                                                     | Type                        | Default        |
| :--------------- | :-------------------------------------------------------------- | :-------------------------- | :------------- |
| **bal-tabindex** | The tabindex of the control.                                    | `number`                    | `0`            |
| **checked**      | If `true`, the radio is selected.                               | `boolean`                   | `false`        |
| **disabled**     | If `true`, the user cannot interact with the checkbox.          | `boolean`                   | `false`        |
| **interface**    | Defines the layout of the radio button                          | `"radio" , "select-button"` | `'radio'`      |
| **inverted**     | If `true`, the control works on dark background.                | `boolean`                   | `false`        |
| **is-empty**     | If `true` the radio has no label                                | `boolean`                   | `false`        |
| **name**         | The name of the control, which is submitted with the form data. | `string`                    | `this.inputId` |
| **value**        | The value of the control.                                       | `string`                    | `''`           |

### Events


| Event        | Description                          | Type         |
| :----------- | :----------------------------------- | :----------- |
| **balBlur**  | Emitted when the toggle loses focus. | `FocusEvent` |
| **balFocus** | Emitted when the toggle has focus.   | `FocusEvent` |

### Methods


| Method         | Description                          | Signature                     |
| :------------- | :----------------------------------- | :---------------------------- |
| **`setFocus`** | Sets the focus on the input element. | `setFocus() => Promise<void>` |


## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-radio.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-radio)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balRadio"></docs-component-script>
</ClientOnly>
