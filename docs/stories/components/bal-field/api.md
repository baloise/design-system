### bal-field
 
#### Properties

| Property     | Attribute    | Description                                                                                                                                                              | Type                     | Default     |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | ----------- |
| `disabled`   | `disabled`   | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean `, ` undefined` | `undefined` |
| `horizontal` | `horizontal` | If true, label and input are aligned horizontally within the field component, with the message positioned in a new line below.                                           | `boolean `, ` undefined` | `false`     |
| `invalid`    | `invalid`    | If `true` the component gets a invalid red style.                                                                                                                        | `boolean `, ` undefined` | `undefined` |
| `loading`    | `loading`    | If `true` a loading spinner is visible at the end of the input                                                                                                           | `boolean `, ` undefined` | `undefined` |
| `readonly`   | `readonly`   | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean `, ` undefined` | `undefined` |
| `required`   | `required`   | If `true` the form control needs to be filled. If it is set to `false` an optional label is added to the label..                                                         | `boolean `, ` undefined` | `undefined` |
| `valid`      | `valid`      | If `true` the component gets a valid green style.                                                                                                                        | `boolean`                | `false`     |


#### Events

| Event                   | Description                                   | Type                       |
| ----------------------- | --------------------------------------------- | -------------------------- |
| `balFormControlDidLoad` | Emitted after render when element is labelled | `CustomEvent<HTMLElement>` |


 