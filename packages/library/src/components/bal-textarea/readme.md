# bal-textarea

> Two-way binding with `v-model` or `ng-model` is available.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                     | Type      | Default        |
| ------------- | -------------- | --------------------------------------------------------------- | --------- | -------------- |
| `balTabindex` | `bal-tabindex` | The tabindex of the control.                                    | `number`  | `0`            |
| `clickable`   | `clickable`    | If `true` the input gets a clickable cursor style               | `boolean` | `false`        |
| `disabled`    | `disabled`     | If `true` the input is disabled                                 | `boolean` | `false`        |
| `inverted`    | `inverted`     | If `true` this component can be placed on dark background       | `boolean` | `false`        |
| `maxLength`   | `max-length`   | Defines the max length of the value.                            | `number`  | `undefined`    |
| `minLength`   | `min-length`   | Defines the min length of the value.                            | `number`  | `undefined`    |
| `name`        | `name`         | The name of the control, which is submitted with the form data. | `string`  | `this.inputId` |
| `placeholder` | `placeholder`  | Placeholder of the input                                        | `string`  | `''`           |
| `readonly`    | `readonly`     | If `true` the input is readonly                                 | `boolean` | `false`        |
| `value`       | `value`        | The value of the control.                                       | `string`  | `''`           |


## Events

| Event         | Description                              | Type                         |
| ------------- | ---------------------------------------- | ---------------------------- |
| `balBlur`     | Emitted when a keyboard input occurred.  | `CustomEvent<FocusEvent>`    |
| `balClick`    | Emitted when the input has clicked.      | `CustomEvent<MouseEvent>`    |
| `balFocus`    | Emitted when the input has focus.        | `CustomEvent<FocusEvent>`    |
| `balInput`    | Emitted when a keyboard input occurred.  | `CustomEvent<string>`        |
| `balKeyPress` | Emitted when a keyboard key has pressed. | `CustomEvent<KeyboardEvent>` |


## Methods

### `setFocus() => Promise<void>`

Sets the focus on the input element.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
