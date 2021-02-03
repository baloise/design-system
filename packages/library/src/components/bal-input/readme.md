# bal-input

> Two-way binding with `v-model` or `ng-model` is available.

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                          | Type      | Default        |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------- | --------- | -------------- |
| `autoComplete`   | `auto-complete`   | The autocomplete attribute specifies whether or not an input field should have autocomplete enabled. | `boolean` | `false`        |
| `balTabindex`    | `bal-tabindex`    | The tabindex of the control.                                                                         | `number`  | `0`            |
| `clickable`      | `clickable`       | If `true` the input gets a clickable cursor style                                                    | `boolean` | `false`        |
| `disabled`       | `disabled`        | If `true` the input is disabled                                                                      | `boolean` | `false`        |
| `inverted`       | `inverted`        | If `true` this component can be placed on dark background                                            | `boolean` | `false`        |
| `maxLength`      | `max-length`      | Defines the max length of the value.                                                                 | `number`  | `undefined`    |
| `minLength`      | `min-length`      | Defines the min length of the value.                                                                 | `number`  | `undefined`    |
| `name`           | `name`            | The name of the control, which is submitted with the form data.                                      | `string`  | `this.inputId` |
| `numberKeyboard` | `number-keyboard` | If `true` on mobile device the number keypad is active                                               | `boolean` | `false`        |
| `onlyNumbers`    | `only-numbers`    | If `true` the input only allows numbers                                                              | `boolean` | `false`        |
| `placeholder`    | `placeholder`     | Placeholder of the input                                                                             | `string`  | `''`           |
| `readonly`       | `readonly`        | If `true` the input is readonly                                                                      | `boolean` | `false`        |
| `type`           | `type`            | Defines the type of the input (text, number, email ...).                                             | `string`  | `'text'`       |
| `value`          | `value`           | The value of the control.                                                                            | `string`  | `''`           |


## Events

| Event         | Description                               | Type                         |
| ------------- | ----------------------------------------- | ---------------------------- |
| `balBlur`     | Emitted when a keyboard input occurred.   | `CustomEvent<FocusEvent>`    |
| `balChange`   | Emitted when the input value has changed. | `CustomEvent<UIEvent>`       |
| `balClick`    | Emitted when the input has clicked.       | `CustomEvent<MouseEvent>`    |
| `balFocus`    | Emitted when the input has focus.         | `CustomEvent<FocusEvent>`    |
| `balInput`    | Emitted when a keyboard input occurred.   | `CustomEvent<string>`        |
| `balKeyPress` | Emitted when a keyboard key has pressed.  | `CustomEvent<KeyboardEvent>` |


## Methods

### `setFocus() => Promise<void>`

Sets the focus on the input element.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
