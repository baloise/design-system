### bal-toast
 
#### Properties

| Property   | Attribute  | Description                                                                             | Type                                                                        | Default |
| ---------- | ---------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------- |
| `color`    | `color`    | The theme type of the toast. Color type primary is deprecated, please use info instead. | `"" `, ` "danger" `, ` "info" `, ` "primary" `, ` "success" `, ` "warning"` | `''`    |
| `duration` | `duration` | The duration of the toast in milliseconds.                                              | `number`                                                                    | `0`     |
| `message`  | `message`  | Content message                                                                         | `string`                                                                    | `''`    |


#### Events

| Event      | Description                  | Type                  |
| ---------- | ---------------------------- | --------------------- |
| `balClose` | Emitted when toast is closed | `CustomEvent<string>` |


#### Methods

| Method    | Description                                     | Type                                         |
| --------- | ----------------------------------------------- | -------------------------------------------- |
| `close`   | Closes this toast                               | `close() => Promise<void>`                   |
| `closeIn` | Closes the toast after the given duration in ms | `closeIn(duration: number) => Promise<void>` |
 