### bal-snackbar
 
#### Properties

| Property   | Attribute  | Description                                                                         | Type                                                                        | Default     |
| ---------- | ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| `action`   | `action`   | Label text for the action button                                                    | `string`                                                                    | `''`        |
| `color`    | `color`    | The theme type of the snackbar.                                                     | `"" `, ` "danger" `, ` "info" `, ` "primary" `, ` "success" `, ` "warning"` | `''`        |
| `duration` | `duration` | The duration of the snackbar                                                        | `number`                                                                    | `0`         |
| `href`     | `href`     | Specifies the URL of the page the link goes to                                      | `string `, ` undefined`                                                     | `undefined` |
| `icon`     | `icon`     | The icon of the snackbar header                                                     | `string`                                                                    | `''`        |
| `message`  | `message`  | The message of the snackbar as html content                                         | `string`                                                                    | `''`        |
| `subject`  | `subject`  | The subject of the snackbar header                                                  | `string`                                                                    | `''`        |
| `target`   | `target`   | Specifies where to display the linked URL. Only applies when an `href` is provided. | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"`                         | `'_self'`   |


#### Events

| Event       | Description                               | Type                  |
| ----------- | ----------------------------------------- | --------------------- |
| `balAction` | Emitted when the action button is clicked | `CustomEvent<string>` |
| `balClose`  | Emitted when snackbar is closed           | `CustomEvent<string>` |


#### Methods

| Method    | Description                                        | Type                                         |
| --------- | -------------------------------------------------- | -------------------------------------------- |
| `close`   | Closes this snackbar                               | `close() => Promise<void>`                   |
| `closeIn` | Closes the snackbar after the given duration in ms | `closeIn(duration: number) => Promise<void>` |
 