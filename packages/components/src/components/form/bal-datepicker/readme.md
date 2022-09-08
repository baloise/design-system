### bal-datepicker
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property        | Attribute         | Description                                                                                                                                                                                                                                                                                                                                                             | Type                                               | Default        |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------- |
| `allowedDates`  | --                | Callback to determine which date in the datepicker should be selectable.                                                                                                                                                                                                                                                                                                | `((dateString: string) => boolean) `, ` undefined` | `undefined`    |
| `closeOnSelect` | `close-on-select` | Closes the datepicker popover after selection                                                                                                                                                                                                                                                                                                                           | `boolean`                                          | `true`         |
| `debounce`      | `debounce`        | Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.                                                                                                                                                                                                 | `number`                                           | `0`            |
| `defaultDate`   | `default-date`    | The date to defines where the datepicker popup starts. The prop accepts ISO 8601 date strings (YYYY-MM-DD).                                                                                                                                                                                                                                                             | `string `, ` undefined`                            | `undefined`    |
| `disabled`      | `disabled`        | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.                                                                                                                                                                                                | `boolean`                                          | `false`        |
| `invalid`       | `invalid`         | If `true` the component gets a invalid style.                                                                                                                                                                                                                                                                                                                           | `boolean`                                          | `false`        |
| `inverted`      | `inverted`        | Set this to `true` when the component is placed on a dark background.                                                                                                                                                                                                                                                                                                   | `boolean`                                          | `false`        |
| `locale`        | `locale`          | <span style="color:red">**[DEPRECATED]**</span> Define the locale of month and day names.<br/><br/>                                                                                                                                                                                                                                                                     | `"" `, ` "de" `, ` "en" `, ` "fr" `, ` "it"`       | `''`           |
| `max`           | `max`             | The maximum datetime allowed. Value must be a date string following the [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime), `1996-12-19`. The format does not have to be specific to an exact datetime. For example, the maximum could just be the year, such as `1994`. Defaults to the end of this year.                                        | `string `, ` undefined`                            | `undefined`    |
| `maxYearProp`   | `max-year`        | Latest year available for selection                                                                                                                                                                                                                                                                                                                                     | `number `, ` undefined`                            | `undefined`    |
| `min`           | `min`             | The minimum datetime allowed. Value must be a date string following the [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime), such as `1996-12-19`. The format does not have to be specific to an exact datetime. For example, the minimum could just be the year, such as `1994`. Defaults to the beginning of the year, 100 years ago from today. | `string `, ` undefined`                            | `undefined`    |
| `minYearProp`   | `min-year`        | Earliest year available for selection                                                                                                                                                                                                                                                                                                                                   | `number `, ` undefined`                            | `undefined`    |
| `name`          | `name`            | The name of the control, which is submitted with the form data.                                                                                                                                                                                                                                                                                                         | `string`                                           | `this.inputId` |
| `placeholder`   | `placeholder`     | The text to display when the select is empty.                                                                                                                                                                                                                                                                                                                           | `string `, ` undefined`                            | `undefined`    |
| `readonly`      | `readonly`        | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                                                                                                                                                                                                                       | `boolean`                                          | `false`        |
| `required`      | `required`        | If `true` the attribute required is added to the native input.                                                                                                                                                                                                                                                                                                          | `boolean`                                          | `false`        |
| `triggerIcon`   | `trigger-icon`    | If `true` the datepicker only open on click of the icon                                                                                                                                                                                                                                                                                                                 | `boolean`                                          | `false`        |
| `value`         | `value`           | The value of the form field, which accepts ISO 8601 date strings (YYYY-MM-DD).                                                                                                                                                                                                                                                                                          | `string `, ` undefined`                            | `undefined`    |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                             | Type                               |
| ----------- | --------------------------------------- | ---------------------------------- |
| `balBlur`   | Emitted when the input loses focus.     | `CustomEvent<FocusEvent>`          |
| `balChange` | Emitted when a option got selected.     | `CustomEvent<string \| undefined>` |
| `balClick`  | Emitted when the input has clicked.     | `CustomEvent<MouseEvent>`          |
| `balFocus`  | Emitted when the input has focus.       | `CustomEvent<FocusEvent>`          |
| `balInput`  | Emitted when a keyboard input occurred. | `CustomEvent<string \| undefined>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `close() => Promise<void>`

Closes the popover

###### Returns

Type: `Promise<void>`



##### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

###### Returns

Type: `Promise<HTMLInputElement>`



##### `open() => Promise<void>`

Opens the popover

###### Returns

Type: `Promise<void>`



##### `select(dateString: string) => Promise<void>`

Selects an option

###### Returns

Type: `Promise<void>`



##### `setFocus() => Promise<void>`

Sets focus on the native `input`. Use this method instead of the global
`input.focus()`.

###### Returns

Type: `Promise<void>`




 