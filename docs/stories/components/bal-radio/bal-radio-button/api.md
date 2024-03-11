### bal-radio-button
 
#### Properties

| Property   | Attribute  | Description                                                                                                                                                              | Type                                                                    | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------- |
| `color`    | `color`    | If `true` the component gets a invalid red style.                                                                                                                        | `"" `, ` "green" `, ` "purple" `, ` "red" `, ` "yellow" `, ` undefined` | `undefined` |
| `disabled` | `disabled` | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean `, ` undefined`                                                | `undefined` |
| `invalid`  | `invalid`  | If `true` the component gets a invalid red style.                                                                                                                        | `boolean `, ` undefined`                                                | `undefined` |
| `readonly` | `readonly` | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean `, ` undefined`                                                | `undefined` |


#### Events

| Event                   | Description                                   | Type                       |
| ----------------------- | --------------------------------------------- | -------------------------- |
| `balBlur`               | Emitted when the toggle loses focus.          | `CustomEvent<FocusEvent>`  |
| `balFocus`              | Emitted when the toggle has focus.            | `CustomEvent<FocusEvent>`  |
| `balFormControlDidLoad` | Emitted after render when element is labelled | `CustomEvent<HTMLElement>` |


 