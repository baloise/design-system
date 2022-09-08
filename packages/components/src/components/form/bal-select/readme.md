### bal-select
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property            | Attribute            | Description                                                                                                                                                                                           | Type                                  | Default        |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | -------------- |
| `balTabindex`       | `bal-tabindex`       | The tabindex of the control.                                                                                                                                                                          | `number`                              | `0`            |
| `disabled`          | `disabled`           | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.                              | `boolean`                             | `false`        |
| `filter`            | `filter`             | If `true` the component gets a invalid style.                                                                                                                                                         | `"includes" `, ` "starts-with"`       | `'includes'`   |
| `hasMovement`       | `has-movement`       | <span style="color:red">**[DEPRECATED]**</span> Enables the slide in animation for the option items.<br/><br/>                                                                                        | `boolean`                             | `false`        |
| `invalid`           | `invalid`            | If `true` the component gets a invalid style.                                                                                                                                                         | `boolean`                             | `false`        |
| `inverted`          | `inverted`           | <span style="color:red">**[DEPRECATED]**</span> Set this to `true` when the component is placed on a dark background. Set this to `true` when the component is placed on a dark background.<br/><br/> | `boolean`                             | `false`        |
| `loading`           | `loading`            | Defines if the select is in a loading state.                                                                                                                                                          | `boolean`                             | `false`        |
| `multiple`          | `multiple`           | If `true` multiple option can be selected                                                                                                                                                             | `boolean`                             | `false`        |
| `name`              | `name`               | The name of the control, which is submitted with the form data.                                                                                                                                       | `string`                              | `this.inputId` |
| `noBorder`          | `no-border`          | <span style="color:red">**[DEPRECATED]**</span> Removes the border of the input.<br/><br/>                                                                                                            | `boolean`                             | `false`        |
| `noDataLabel`       | `no-data-label`      | This label is shown if typeahead is active and all the options are filtered out.                                                                                                                      | `string `, ` undefined`               | `undefined`    |
| `placeholder`       | `placeholder`        | The text to display when the select is empty.                                                                                                                                                         | `string `, ` undefined`               | `undefined`    |
| `readonly`          | `readonly`           | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                                                     | `boolean`                             | `false`        |
| `remote`            | `remote`             | If `true` the filtering is done outside the component.                                                                                                                                                | `boolean`                             | `false`        |
| `required`          | `required`           | If `true`, the user must fill in a value before submitting a form.                                                                                                                                    | `boolean`                             | `false`        |
| `scrollable`        | `scrollable`         | Defines the height of the popover list.                                                                                                                                                               | `number`                              | `250`          |
| `selectionOptional` | `selection-optional` | If `true` the options are a proposal and the user can also create his own value. Can only be used with the typeahead property.                                                                        | `boolean`                             | `false`        |
| `typeahead`         | `typeahead`          | If `true` the user can search by typing into the input field.                                                                                                                                         | `boolean`                             | `false`        |
| `value`             | `value`              | Selected option values. Could also be passed as a string, which gets transformed.                                                                                                                     | `string `, ` string[] `, ` undefined` | `[]`           |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event         | Description                                                        | Type                                           |
| ------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| `balBlur`     | Emitted when the input loses focus.                                | `CustomEvent<FocusEvent>`                      |
| `balCancel`   | Emitted when the user cancels the input.                           | `CustomEvent<KeyboardEvent>`                   |
| `balChange`   | Emitted when a option got selected.                                | `CustomEvent<string \| string[] \| undefined>` |
| `balClick`    | Emitted when the input got clicked.                                | `CustomEvent<MouseEvent>`                      |
| `balFocus`    | Emitted when the input has focus.                                  | `CustomEvent<FocusEvent>`                      |
| `balInput`    | Emitted when a keyboard input occurred.                            | `CustomEvent<string>`                          |
| `balKeyPress` | Emitted when the input has focus and key from the keyboard go hit. | `CustomEvent<KeyboardEvent>`                   |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `cancel() => Promise<void>`

Cancel the popover

###### Returns

Type: `Promise<void>`



##### `clear() => Promise<void>`

Sets the value to `[]`, the input value to ´''´ and the focus index to ´0´.

###### Returns

Type: `Promise<void>`



##### `close() => Promise<void>`

Closes the popover

###### Returns

Type: `Promise<void>`



##### `getValue() => Promise<string[] | undefined>`

Sets the focus on the input element

###### Returns

Type: `Promise<string[] | undefined>`



##### `open() => Promise<void>`

Opens the popover

###### Returns

Type: `Promise<void>`



##### `select(value: string) => Promise<void>`

Select option by passed value

###### Returns

Type: `Promise<void>`



##### `setFocus() => Promise<void>`

Sets the focus on the input element

###### Returns

Type: `Promise<void>`




 