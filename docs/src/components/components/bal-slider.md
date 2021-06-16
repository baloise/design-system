# bal-slider

<!-- START: human documentation top -->

The slider component lets users select from a range of values by moving the slider thumb.

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-slider-88></docs-demo-bal-slider-88></ClientOnly>


## With Steps

<ClientOnly><docs-demo-bal-slider-89></docs-demo-bal-slider-89></ClientOnly>


## With Field

<ClientOnly><docs-demo-bal-slider-90></docs-demo-bal-slider-90></ClientOnly>



## API

### bal-slider

#### Properties

| Attribute        | Description                                                                                                                                                             | Type                          | Default        |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :------------- |
| **bal-tabindex** | The tabindex of the control.                                                                                                                                            | `number`                      | `0`            |
| **debounce**     | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`. | `number`                      | `0`            |
| **disabled**     | If `true` the input is disabled                                                                                                                                         | `boolean`                     | `false`        |
| **has-ticks**    | If `true`, small ticks for the steps are shown.                                                                                                                         | `boolean`                     | `false`        |
| **max**          | Max value of the model.                                                                                                                                                 | `number`                      | `100`          |
| **min**          | Min value of the model.                                                                                                                                                 | `number`                      | `0`            |
| **name**         | The name of the control, which is submitted with the form data.                                                                                                         | `string`                      | `this.inputId` |
| **readonly**     | If `true`, the user cannot modify the value.                                                                                                                            | `boolean`                     | `false`        |
| **required**     | If `true`, the user must fill in a value before submitting a form.                                                                                                      | `boolean`                     | `false`        |
| **step**         | The step size. 0 means no steps.                                                                                                                                        | `number`                      | `0`            |
| **value**        | The value of the input.                                                                                                                                                 | `number , string , undefined` | `''`           |

#### Events

| Event           | Description                               | Type                     |
| :-------------- | :---------------------------------------- | :----------------------- |
| **balBlur**     | Emitted when a keyboard input occurred.   | `FocusEvent`             |
| **balChange**   | Emitted when the input value has changed. | `null | number | string` |
| **balClick**    | Emitted when the input has clicked.       | `MouseEvent`             |
| **balFocus**    | Emitted when the input has focus.         | `FocusEvent`             |
| **balInput**    | Emitted when a keyboard input occurred.   | `null | number | string` |
| **balKeyPress** | Emitted when a keyboard key has pressed.  | `KeyboardEvent`          |

#### Methods

| Method                | Description                                                                                             | Signature                                        |
| :-------------------- | :------------------------------------------------------------------------------------------------------ | :----------------------------------------------- |
| **`getInputElement`** | Returns the native `<input>` element used under the hood.                                               | `getInputElement() => Promise<HTMLInputElement>` |
| **`setFocus`**        | Sets focus on the native `input` in `bal-input`. Use this method instead of the global
`input.focus()`. | `setFocus() => Promise<void>`                    |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-slider.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-slider)
