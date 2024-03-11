### bal-time-input
 
#### Properties

| Property         | Attribute          | Description                                                                                                                                                              | Type                    | Default        |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | -------------- |
| `autoInvalidOff` | `auto-invalid-off` | If `true`, in Angular reactive forms the control will not be set invalid                                                                                                 | `boolean`               | `false`        |
| `debounce`       | `debounce`         | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.  | `number`                | `0`            |
| `disabled`       | `disabled`         | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`               | `false`        |
| `invalid`        | `invalid`          | If `true` the component gets a invalid style.                                                                                                                            | `boolean`               | `false`        |
| `name`           | `name`             | The name of the control, which is submitted with the form data.                                                                                                          | `string`                | `this.inputId` |
| `readonly`       | `readonly`         | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean`               | `false`        |
| `required`       | `required`         | If `true`, the user must fill in a value before submitting a form.                                                                                                       | `boolean`               | `false`        |
| `value`          | `value`            | The value of the input.                                                                                                                                                  | `string `, ` undefined` | `undefined`    |


#### Events

| Event         | Description                              | Type                               |
| ------------- | ---------------------------------------- | ---------------------------------- |
| `balBlur`     | Emitted when the input loses focus.      | `CustomEvent<FocusEvent>`          |
| `balChange`   | Emitted when the value has changed.      | `CustomEvent<string \| undefined>` |
| `balClick`    | Emitted when the input has clicked.      | `CustomEvent<MouseEvent>`          |
| `balFocus`    | Emitted when the input has focus.        | `CustomEvent<FocusEvent>`          |
| `balInput`    | Emitted when a keyboard input occurred.  | `CustomEvent<string \| undefined>` |
| `balKeyPress` | Emitted when a keyboard key has pressed. | `CustomEvent<KeyboardEvent>`       |


#### Methods

| Method            | Description                                                                              | Type                                             |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `getInputElement` | Returns the native `<input>` element used under the hood.                                | `getInputElement() => Promise<HTMLInputElement>` |
| `setFocus`        | Sets focus on the native `input`. Use this method instead of the global `input.focus()`. | `setFocus() => Promise<void>`                    |
 