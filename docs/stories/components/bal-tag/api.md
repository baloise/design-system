### bal-tag
 
#### Properties

| Property   | Attribute  | Description                                                                                                                                                              | Type                                                                                                                                                    | Default  |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `closable` | `closable` | The theme type of the tag.                                                                                                                                               | `boolean`                                                                                                                                               | `false`  |
| `color`    | `color`    | The theme type of the tag.                                                                                                                                               | `"" `, ` "blue" `, ` "danger" `, ` "green" `, ` "grey" `, ` "info" `, ` "primary" `, ` "purple" `, ` "red" `, ` "success" `, ` "warning" `, ` "yellow"` | `''`     |
| `disabled` | `disabled` | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`                                                                                                                                               | `false`  |
| `invalid`  | `invalid`  | Overwrites the default color to invalid style                                                                                                                            | `boolean`                                                                                                                                               | `false`  |
| `light`    | `light`    | If `true` a light version of the color is displayed                                                                                                                      | `boolean`                                                                                                                                               | `false`  |
| `position` | `position` | Choosing left or center the tag is aligned to that side in the bal-card.                                                                                                 | `"center" `, ` "left"`                                                                                                                                  | `'left'` |
| `size`     | `size`     | The size of the tag element                                                                                                                                              | `"" `, ` "large" `, ` "medium" `, ` "small"`                                                                                                            | `''`     |


#### Events

| Event           | Description                         | Type                      |
| --------------- | ----------------------------------- | ------------------------- |
| `balCloseClick` | Emitted when the input got clicked. | `CustomEvent<MouseEvent>` |


 