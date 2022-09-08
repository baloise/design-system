### bal-tag
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property   | Attribute  | Description                                                                                                                                                              | Type                                                                                                                                                    | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `closable` | `closable` | The theme type of the tag. Given by bulma our css framework.                                                                                                             | `boolean`                                                                                                                                               | `false` |
| `color`    | `color`    | The theme type of the tag. Given by bulma our css framework.                                                                                                             | `"" `, ` "blue" `, ` "danger" `, ` "green" `, ` "grey" `, ` "info" `, ` "primary" `, ` "purple" `, ` "red" `, ` "success" `, ` "warning" `, ` "yellow"` | `''`    |
| `disabled` | `disabled` | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`                                                                                                                                               | `false` |
| `invalid`  | `invalid`  | Overwrites the default color to invalid style                                                                                                                            | `boolean`                                                                                                                                               | `false` |
| `light`    | `light`    | If `true` a light version of the color is displayed                                                                                                                      | `boolean`                                                                                                                                               | `false` |
| `size`     | `size`     | The size of the tag element                                                                                                                                              | `"" `, ` "large" `, ` "medium" `, ` "small"`                                                                                                            | `''`    |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event           | Description                         | Type                      |
| --------------- | ----------------------------------- | ------------------------- |
| `balCloseClick` | Emitted when the input got clicked. | `CustomEvent<MouseEvent>` |


 