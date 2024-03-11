### bal-radio
 
#### Properties

| Property      | Attribute      | Description                                                                                                                                                              | Type                           | Default        |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | -------------- |
| `disabled`    | `disabled`     | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`                      | `false`        |
| `flat`        | `flat`         | If `true` the control is no padding                                                                                                                                      | `boolean`                      | `false`        |
| `interface`   | `interface`    | Defines the layout of the radio button                                                                                                                                   | `"radio" `, ` "select-button"` | `'radio'`      |
| `invalid`     | `invalid`      | If `true` the component gets a invalid style.                                                                                                                            | `boolean`                      | `false`        |
| `invisible`   | `invisible`    | If `true` the radio is invisible, but sill active                                                                                                                        | `boolean`                      | `false`        |
| `label`       | `label`        | Label of the radio item.                                                                                                                                                 | `string`                       | `''`           |
| `labelHidden` | `label-hidden` | If `true` the radio has no label                                                                                                                                         | `boolean`                      | `false`        |
| `name`        | `name`         | The name of the control, which is submitted with the form data.                                                                                                          | `string`                       | `this.inputId` |
| `nonSubmit`   | `non-submit`   | If `true`, the value will not be send with a form submit                                                                                                                 | `boolean`                      | `false`        |
| `readonly`    | `readonly`     | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean`                      | `false`        |
| `required`    | `required`     | If `true`, the user must fill in a value before submitting a form.                                                                                                       | `boolean`                      | `false`        |
| `value`       | `value`        | the value of the radio.                                                                                                                                                  | `any`                          | `undefined`    |


#### Events

| Event       | Description                                    | Type                      |
| ----------- | ---------------------------------------------- | ------------------------- |
| `balBlur`   | Emitted when the toggle loses focus.           | `CustomEvent<FocusEvent>` |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<boolean>`    |
| `balFocus`  | Emitted when the toggle has focus.             | `CustomEvent<FocusEvent>` |


#### Methods

| Method            | Description                                               | Type                                                          |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| `getInputElement` | Returns the native `<input>` element used under the hood. | `getInputElement() => Promise<HTMLInputElement \| undefined>` |
| `getOption`       | Options of the tab like label, value etc.                 | `getOption() => Promise<BalRadioOption>`                      |
 