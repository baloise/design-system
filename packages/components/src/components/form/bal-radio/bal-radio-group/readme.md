### bal-radio-group
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/usage-property--page) guide to learn how to change properties of the component.

| Property           | Attribute            | Description                                                                                                                                                              | Type                              | Default        |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | -------------- |
| `disabled`         | `disabled`           | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean `, ` undefined`          | `undefined`    |
| `interface`        | `interface`          | Defines the layout of the radio button                                                                                                                                   | `"radio" `, ` "select-button"`    | `'radio'`      |
| `inverted`         | `inverted`           | If `true` the component can be used on dark background                                                                                                                   | `boolean`                         | `false`        |
| `name`             | `name`               | The name of the control, which is submitted with the form data.                                                                                                          | `string`                          | `this.inputId` |
| `readonly`         | `readonly`           | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean `, ` undefined`          | `undefined`    |
| `value`            | `value`              | The value of the control.                                                                                                                                                | `boolean `, ` number `, ` string` | `''`           |
| `vertical`         | `vertical`           | Displays the checkboxes vertically                                                                                                                                       | `boolean`                         | `false`        |
| `verticalOnMobile` | `vertical-on-mobile` | If `true`, the controls will be vertically on mobile devices.                                                                                                            | `boolean`                         | `false`        |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/usage-event--page) guide to learn how to listen to component events.

| Event       | Description                                    | Type                                       |
| ----------- | ---------------------------------------------- | ------------------------------------------ |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<boolean \| number \| string>` |


 