### bal-radio
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property      | Attribute      | Description                                                                                                                                                              | Type                              | Default        |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | -------------- |
| `checked`     | `checked`      | If `true`, the radio is selected.                                                                                                                                        | `boolean`                         | `false`        |
| `disabled`    | `disabled`     | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`                         | `false`        |
| `flat`        | `flat`         | If `true` the control is no padding                                                                                                                                      | `boolean`                         | `false`        |
| `hidden`      | `hidden`       | If `true`, the value will not be send with a form submit                                                                                                                 | `boolean`                         | `false`        |
| `interface`   | `interface`    | Defines the layout of the radio button                                                                                                                                   | `"radio" `, ` "select-button"`    | `'radio'`      |
| `invalid`     | `invalid`      | If `true` the component gets a invalid style.                                                                                                                            | `boolean`                         | `false`        |
| `isEmpty`     | `is-empty`     | <span style="color:red">**[DEPRECATED]**</span> If `true` the radio has no label<br/><br/>                                                                               | `boolean`                         | `false`        |
| `labelHidden` | `label-hidden` | If `true` the radio has no label                                                                                                                                         | `boolean`                         | `false`        |
| `name`        | `name`         | The name of the control, which is submitted with the form data.                                                                                                          | `string`                          | `this.inputId` |
| `readonly`    | `readonly`     | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean`                         | `false`        |
| `required`    | `required`     | If `true`, the user must fill in a value before submitting a form.                                                                                                       | `boolean`                         | `false`        |
| `value`       | `value`        | Value of the radio item, if checked the whole group has this value.                                                                                                      | `boolean `, ` number `, ` string` | `''`           |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                                    | Type                      |
| ----------- | ---------------------------------------------- | ------------------------- |
| `balBlur`   | Emitted when the toggle loses focus.           | `CustomEvent<FocusEvent>` |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<boolean>`    |
| `balClick`  | Emitted when the input has clicked.            | `CustomEvent<MouseEvent>` |
| `balFocus`  | Emitted when the toggle has focus.             | `CustomEvent<FocusEvent>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `getInputElement() => Promise<HTMLInputElement | undefined>`

Returns the native `<input>` element used under the hood.

###### Returns

Type: `Promise<HTMLInputElement | undefined>`



##### `setFocus() => Promise<void>`

Sets the focus on the checkbox input element.

###### Returns

Type: `Promise<void>`




 