# bal-slider

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                             | Type                            | Default        |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------- |
| `balTabindex` | `bal-tabindex` | The tabindex of the control.                                                                                                                                            | `number`                        | `0`            |
| `debounce`    | `debounce`     | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`. | `number`                        | `0`            |
| `disabled`    | `disabled`     | If `true` the input is disabled                                                                                                                                         | `boolean`                       | `false`        |
| `hasTicks`    | `has-ticks`    | If `true`, small ticks for the steps are shown.                                                                                                                         | `boolean`                       | `false`        |
| `max`         | `max`          | Max value of the model.                                                                                                                                                 | `number`                        | `100`          |
| `min`         | `min`          | Min value of the model.                                                                                                                                                 | `number`                        | `0`            |
| `name`        | `name`         | The name of the control, which is submitted with the form data.                                                                                                         | `string`                        | `this.inputId` |
| `readonly`    | `readonly`     | If `true`, the user cannot modify the value.                                                                                                                            | `boolean`                       | `false`        |
| `required`    | `required`     | If `true`, the user must fill in a value before submitting a form.                                                                                                      | `boolean`                       | `false`        |
| `step`        | `step`         | The step size. 0 means no steps.                                                                                                                                        | `number`                        | `0`            |
| `value`       | `value`        | The value of the input.                                                                                                                                                 | `number \| string \| undefined` | `''`           |


## Events

| Event         | Description                               | Type                                    |
| ------------- | ----------------------------------------- | --------------------------------------- |
| `balBlur`     | Emitted when a keyboard input occurred.   | `CustomEvent<FocusEvent>`               |
| `balChange`   | Emitted when the input value has changed. | `CustomEvent<null \| number \| string>` |
| `balClick`    | Emitted when the input has clicked.       | `CustomEvent<MouseEvent>`               |
| `balFocus`    | Emitted when the input has focus.         | `CustomEvent<FocusEvent>`               |
| `balInput`    | Emitted when a keyboard input occurred.   | `CustomEvent<null \| number \| string>` |
| `balKeyPress` | Emitted when a keyboard key has pressed.  | `CustomEvent<KeyboardEvent>`            |


## Methods

### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

#### Returns

Type: `Promise<HTMLInputElement>`



### `setFocus() => Promise<void>`

Sets focus on the native `input` in `bal-input`. Use this method instead of the global
`input.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
