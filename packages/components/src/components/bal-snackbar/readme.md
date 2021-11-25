### bal-snackbar


#### Properties

| Property   | Attribute  | Description                                                       | Type                                                                        | Default |
| ---------- | ---------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- | ------- |
| `action`   | `action`   | Label text for the action button                                  | `string`                                                                    | `''`    |
| `color`    | `color`    | The theme type of the snackbar. Given by bulma our css framework. | `"" `, ` "danger" `, ` "info" `, ` "primary" `, ` "success" `, ` "warning"` | `''`    |
| `duration` | `duration` | The duration of the snackbar                                      | `number`                                                                    | `0`     |
| `icon`     | `icon`     | The icon of the snackbar header                                   | `string`                                                                    | `''`    |
| `message`  | `message`  | The message of the snackbar                                       | `string`                                                                    | `''`    |
| `subject`  | `subject`  | The subject of the snackbar header                                | `string`                                                                    | `''`    |


#### Events

| Event       | Description                               | Type                  |
| ----------- | ----------------------------------------- | --------------------- |
| `balAction` | Emitted when the action button is clicked | `CustomEvent<string>` |
| `balClose`  | Emitted when snackbar is closed           | `CustomEvent<string>` |


#### Methods

##### `close() => Promise<void>`

Closes this snackbar

###### Returns

Type: `Promise<void>`



##### `closeIn(duration: number) => Promise<void>`

Closes the snackbar after the given duration in ms

###### Returns

Type: `Promise<void>`



