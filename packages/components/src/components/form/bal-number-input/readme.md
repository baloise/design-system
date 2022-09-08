### bal-number-input
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property      | Attribute      | Description                                                                                                                                                              | Type                    | Default        |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | -------------- |
| `debounce`    | `debounce`     | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.  | `number`                | `0`            |
| `decimal`     | `decimal`      | Defines the allowed decimal points for the `number-input`.                                                                                                               | `number`                | `0`            |
| `disabled`    | `disabled`     | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`               | `false`        |
| `exactNumber` | `exact-number` | If `true` the input value has 0 as default value                                                                                                                         | `boolean`               | `false`        |
| `invalid`     | `invalid`      | If `true` the component gets a invalid style.                                                                                                                            | `boolean`               | `false`        |
| `name`        | `name`         | The name of the control, which is submitted with the form data.                                                                                                          | `string`                | `this.inputId` |
| `placeholder` | `placeholder`  | Instructional text that shows before the input has a value.                                                                                                              | `string `, ` undefined` | `undefined`    |
| `readonly`    | `readonly`     | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean`               | `false`        |
| `required`    | `required`     | If `true`, the user must fill in a value before submitting a form.                                                                                                       | `boolean`               | `false`        |
| `suffix`      | `suffix`       | Adds a suffix the the input-value after blur.                                                                                                                            | `string `, ` undefined` | `undefined`    |
| `value`       | `value`        | The value of the input.                                                                                                                                                  | `number `, ` undefined` | `undefined`    |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event         | Description                              | Type                               |
| ------------- | ---------------------------------------- | ---------------------------------- |
| `balBlur`     | Emitted when the input loses focus.      | `CustomEvent<FocusEvent>`          |
| `balChange`   | Emitted when the value has changed.      | `CustomEvent<number \| undefined>` |
| `balClick`    | Emitted when the input has clicked.      | `CustomEvent<MouseEvent>`          |
| `balFocus`    | Emitted when the input has focus.        | `CustomEvent<FocusEvent>`          |
| `balInput`    | Emitted when a keyboard input occurred.  | `CustomEvent<number \| undefined>` |
| `balKeyPress` | Emitted when a keyboard key has pressed. | `CustomEvent<KeyboardEvent>`       |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

###### Returns

Type: `Promise<HTMLInputElement>`



##### `setFocus() => Promise<void>`

Sets focus on the native `input`. Use this method instead of the global
`input.focus()`.

###### Returns

Type: `Promise<void>`




 