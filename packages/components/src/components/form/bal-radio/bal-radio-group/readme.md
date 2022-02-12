### bal-radio-group
 
#### Properties

| Property           | Attribute            | Description                                                     | Type                           | Default        |
| ------------------ | -------------------- | --------------------------------------------------------------- | ------------------------------ | -------------- |
| `disabled`         | `disabled`           | If `true`, the user cannot interact with the radios.            | `boolean `, ` undefined`       | `undefined`    |
| `interface`        | `interface`          | Defines the layout of the radio button                          | `"radio" `, ` "select-button"` | `'radio'`      |
| `inverted`         | `inverted`           | If `true` the component can be used on dark background          | `boolean`                      | `false`        |
| `name`             | `name`               | The name of the control, which is submitted with the form data. | `string`                       | `this.inputId` |
| `value`            | `value`              | The value of the control.                                       | `string`                       | `''`           |
| `verticalOnMobile` | `vertical-on-mobile` | If `true`, the controls will be vertically on mobile devices.   | `boolean`                      | `false`        |


#### Events

| Event       | Description                                    | Type                  |
| ----------- | ---------------------------------------------- | --------------------- |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<string>` |


 