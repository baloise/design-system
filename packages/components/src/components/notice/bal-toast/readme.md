### bal-toast
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property   | Attribute  | Description                                                                                                               | Type                                                                        | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------- |
| `color`    | `color`    | The theme type of the toast. Given by bulma our css framework. Color type primary is deprecated, please use info instead. | `"" `, ` "danger" `, ` "info" `, ` "primary" `, ` "success" `, ` "warning"` | `''`    |
| `duration` | `duration` | The duration of the toast in milliseconds.                                                                                | `number`                                                                    | `0`     |
| `message`  | `message`  | Content message                                                                                                           | `string`                                                                    | `''`    |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event      | Description                  | Type                  |
| ---------- | ---------------------------- | --------------------- |
| `balClose` | Emitted when toast is closed | `CustomEvent<string>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `close() => Promise<void>`

Closes this toast

###### Returns

Type: `Promise<void>`



##### `closeIn(duration: number) => Promise<void>`

Closes the toast after the given duration in ms

###### Returns

Type: `Promise<void>`




 