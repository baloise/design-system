# Textarea <Badge text="Two-way binding"/>

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                                                                                                                                                      | Type                                                                                               | Default        |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------- |
| `autocapitalize` | `autocapitalize` | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.                                                                | `string`                                                                                           | `'none'`       |
| `autofocus`      | `autofocus`      | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                         | `boolean`                                                                                          | `false`        |
| `balTabindex`    | `bal-tabindex`   | The tabindex of the control.                                                                                                                                                     | `number`                                                                                           | `0`            |
| `clickable`      | `clickable`      | If `true` the input gets a clickable cursor style                                                                                                                                | `boolean`                                                                                          | `false`        |
| `cols`           | `cols`           | The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.                                                           | `number \| undefined`                                                                              | `undefined`    |
| `debounce`       | `debounce`       | Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.          | `number`                                                                                           | `0`            |
| `disabled`       | `disabled`       | If `true`, the user cannot interact with the textarea.                                                                                                                           | `boolean`                                                                                          | `false`        |
| `inputmode`      | `inputmode`      | A hint to the browser for which keyboard to display. Possible values: `"none"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, and `"search"`.                 | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url" \| undefined` | `undefined`    |
| `inverted`       | `inverted`       | If `true` this component can be placed on dark background                                                                                                                        | `boolean`                                                                                          | `false`        |
| `maxLength`      | `max-length`     | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter. | `number \| undefined`                                                                              | `undefined`    |
| `minLength`      | `min-length`     | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter. | `number \| undefined`                                                                              | `undefined`    |
| `name`           | `name`           | The name of the control, which is submitted with the form data.                                                                                                                  | `string`                                                                                           | `this.inputId` |
| `placeholder`    | `placeholder`    | Instructional text that shows before the input has a value.                                                                                                                      | `string \| undefined`                                                                              | `undefined`    |
| `readonly`       | `readonly`       | If `true`, the user cannot modify the value.                                                                                                                                     | `boolean`                                                                                          | `false`        |
| `required`       | `required`       | If `true`, the user must fill in a value before submitting a form.                                                                                                               | `boolean`                                                                                          | `false`        |
| `rows`           | `rows`           | The number of visible text lines for the control.                                                                                                                                | `number \| undefined`                                                                              | `undefined`    |
| `value`          | `value`          | The value of the textarea.                                                                                                                                                       | `string \| undefined`                                                                              | `''`           |
| `wrap`           | `wrap`           | Indicates how the control wraps text.                                                                                                                                            | `"hard" \| "off" \| "soft" \| undefined`                                                           | `undefined`    |


## Events

| Event         | Description                                | Type                         |
| ------------- | ------------------------------------------ | ---------------------------- |
| `balBlur`     | Emitted when a keyboard input occurred.    | `CustomEvent<FocusEvent>`    |
| `balChange`   | Emitted when the input value has changed.. | `CustomEvent<string>`        |
| `balClick`    | Emitted when the input has clicked.        | `CustomEvent<MouseEvent>`    |
| `balFocus`    | Emitted when the input has focus.          | `CustomEvent<FocusEvent>`    |
| `balInput`    | Emitted when a keyboard input occurred.    | `CustomEvent<string>`        |
| `balKeyPress` | Emitted when a keyboard key has pressed.   | `CustomEvent<KeyboardEvent>` |


## Methods

### `getInputElement() => Promise<HTMLTextAreaElement>`

Returns the native `<textarea>` element used under the hood.

#### Returns

Type: `Promise<HTMLTextAreaElement>`



### `setFocus() => Promise<void>`

Sets focus on the native `textarea` in `ion-textarea`. Use this method instead of the global
`textarea.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
