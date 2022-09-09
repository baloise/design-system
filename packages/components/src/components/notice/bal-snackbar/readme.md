### bal-snackbar
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property   | Attribute  | Description                                                                         | Type                                                                        | Default     |
| ---------- | ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| `action`   | `action`   | Label text for the action button                                                    | `string`                                                                    | `''`        |
| `color`    | `color`    | The theme type of the snackbar. Given by bulma our css framework.                   | `"" `, ` "danger" `, ` "info" `, ` "primary" `, ` "success" `, ` "warning"` | `''`        |
| `duration` | `duration` | The duration of the snackbar                                                        | `number`                                                                    | `0`         |
| `href`     | `href`     | Specifies the URL of the page the link goes to                                      | `string `, ` undefined`                                                     | `undefined` |
| `icon`     | `icon`     | The icon of the snackbar header                                                     | `string`                                                                    | `''`        |
| `message`  | `message`  | The message of the snackbar                                                         | `string`                                                                    | `''`        |
| `subject`  | `subject`  | The subject of the snackbar header                                                  | `string`                                                                    | `''`        |
| `target`   | `target`   | Specifies where to display the linked URL. Only applies when an `href` is provided. | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"`                         | `'_self'`   |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                               | Type                  |
| ----------- | ----------------------------------------- | --------------------- |
| `balAction` | Emitted when the action button is clicked | `CustomEvent<string>` |
| `balClose`  | Emitted when snackbar is closed           | `CustomEvent<string>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `close() => Promise<void>`

Closes this snackbar

###### Returns

Type: `Promise<void>`



##### `closeIn(duration: number) => Promise<void>`

Closes the snackbar after the given duration in ms

###### Returns

Type: `Promise<void>`




 