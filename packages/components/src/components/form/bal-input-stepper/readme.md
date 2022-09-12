### bal-input-stepper
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property   | Attribute  | Description                                                                                                                                                              | Type      | Default        |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | -------------- |
| `debounce` | `debounce` | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.  | `number`  | `0`            |
| `disabled` | `disabled` | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean` | `false`        |
| `invalid`  | `invalid`  | If `true` the input is shown as invalid                                                                                                                                  | `boolean` | `false`        |
| `max`      | `max`      | The max value the input can have                                                                                                                                         | `number`  | `10`           |
| `min`      | `min`      | The min value the input can have                                                                                                                                         | `number`  | `0`            |
| `name`     | `name`     | The name of the control, which is submitted with the form data.                                                                                                          | `string`  | `this.inputId` |
| `readonly` | `readonly` | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean` | `false`        |
| `steps`    | `steps`    | The steps in which the input increases or decreases                                                                                                                      | `number`  | `1`            |
| `value`    | `value`    | The value of the input. Only allows values in the range of the min max attribute.                                                                                        | `number`  | `0`            |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event         | Description                                 | Type                               |
| ------------- | ------------------------------------------- | ---------------------------------- |
| `balChange`   | Emitted when the input value has changed.   | `CustomEvent<number \| undefined>` |
| `balDecrease` | Emitted when the input value has decreased. | `CustomEvent<number \| undefined>` |
| `balIncrease` | Emitted when the input value has increased. | `CustomEvent<number \| undefined>` |
| `balInput`    | Emitted when the input value has changed.   | `CustomEvent<number \| undefined>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `getInputElement() => Promise<HTMLInputElement | undefined>`

Returns the native `<input>` element used under the hood.

###### Returns

Type: `Promise<HTMLInputElement | undefined>`




 