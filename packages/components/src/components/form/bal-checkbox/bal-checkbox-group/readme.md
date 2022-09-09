### bal-checkbox-group
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property           | Attribute            | Description                                                     | Type                                                           | Default        |
| ------------------ | -------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- | -------------- |
| `control`          | `control`            | If `true` it acts as the main form control                      | `boolean`                                                      | `false`        |
| `disabled`         | `disabled`           | If `true`, the user cannot interact with the checkboxes.        | `boolean `, ` undefined`                                       | `undefined`    |
| `expanded`         | `expanded`           | Uses the whole width                                            | `boolean`                                                      | `false`        |
| `interface`        | `interface`          | Defines the layout of the checkbox button                       | `"checkbox" `, ` "select-button" `, ` "switch" `, ` undefined` | `undefined`    |
| `name`             | `name`               | The name of the control, which is submitted with the form data. | `string`                                                       | `this.inputId` |
| `readonly`         | `readonly`           | If `true`, the user cannot interact with the checkboxes.        | `boolean `, ` undefined`                                       | `undefined`    |
| `value`            | --                   | The value of the control.                                       | `any[]`                                                        | `[]`           |
| `vertical`         | `vertical`           | Displays the checkboxes vertically                              | `boolean`                                                      | `false`        |
| `verticalOnMobile` | `vertical-on-mobile` | If `true`, the controls will be vertically on mobile devices.   | `boolean`                                                      | `false`        |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                                    | Type                 |
| ----------- | ---------------------------------------------- | -------------------- |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<any[]>` |


 